'use client';
import { useFormState, useFormStatus } from 'react-dom';
import { getRecipesAction, FormState } from '@/app/actions';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { RecipeList } from './recipe-list';
import { RecipeFilters } from './recipe-filters';
import { RecipeSkeleton } from './recipe-skeleton';
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { ChefHat } from 'lucide-react';

const initialState: FormState = {
  message: '',
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return <Button type="submit" className="w-full sm:w-auto" size="lg" disabled={pending}>{pending ? 'Generating...' : 'Generate Recipes'}</Button>;
}

function RecipeSection({ state }: { state: FormState }) {
  const { pending } = useFormStatus();
  
  if (pending) {
    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h3 className="text-3xl font-headline font-bold">Generating Recipes...</h3>
            </div>
            <RecipeSkeleton />
        </div>
    );
  }

  if (state.recipes && state.recipes.length > 0) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h3 className="text-3xl font-headline font-bold">Your Recipes</h3>
          <RecipeFilters />
        </div>
        <RecipeList recipes={state.recipes} />
      </div>
    );
  }

  if (!pending && state.message && (!state.recipes || state.recipes.length === 0)) {
    return (
      <div className="text-center py-16 px-6 bg-card border rounded-lg shadow-sm">
        <p className="text-muted-foreground">{state.message}</p>
      </div>
    );
  }
  
  return (
    <div className="text-center py-16 px-6 bg-card border rounded-lg shadow-sm">
      <ChefHat className="mx-auto h-12 w-12 text-muted-foreground" />
      <h3 className="mt-4 text-lg font-medium">Recipes will appear here</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Enter your ingredients above and let the magic happen!
      </p>
    </div>
  );
}

export function FridgeChefPage() {
  const [state, formAction] = useFormState(getRecipesAction, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.message && state.error) {
      toast({
        title: 'Oops!',
        description: state.message,
        variant: 'destructive',
      });
    }
  }, [state, toast]);
  
  return (
    <div className="max-w-5xl mx-auto">
      <form action={formAction} className="space-y-12">
        <Card className="overflow-hidden shadow-lg border-2 border-primary/10">
          <CardHeader>
            <CardTitle className="font-headline text-3xl">What's in your fridge?</CardTitle>
            <CardDescription>Enter the ingredients you have, and let AI create delicious recipes for you!</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea 
              name="ingredients" 
              id="ingredients" 
              placeholder="e.g., chicken breast, tomatoes, basil, pasta" 
              rows={4} 
              required 
              className="text-base focus:ring-primary focus:border-primary" 
            />
          </CardContent>
          <CardFooter className="bg-muted/30 px-6 py-4">
            <SubmitButton />
          </CardFooter>
        </Card>
        
        <RecipeSection state={state} />
      </form>
    </div>
  );
}
