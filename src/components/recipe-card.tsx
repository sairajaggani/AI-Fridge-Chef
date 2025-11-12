import type { Recipe } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from 'next/image';

type RecipeCardProps = {
    recipe: Recipe;
}

export function RecipeCard({ recipe }: RecipeCardProps) {
    return (
        <Card className="overflow-hidden transition-transform transform hover:-translate-y-1 hover:shadow-xl">
            <CardHeader className="p-0">
                <div className="relative aspect-video w-full">
                    <Image 
                        src={recipe.image}
                        alt={recipe.title}
                        fill
                        className="object-cover"
                        data-ai-hint={recipe.imageHint}
                    />
                </div>
            </CardHeader>
            <CardContent className="p-4">
                <CardTitle className="text-lg font-headline font-bold leading-tight">{recipe.title}</CardTitle>
                <p className="mt-2 text-sm text-muted-foreground">{recipe.description}</p>
            </CardContent>
        </Card>
    )
}
