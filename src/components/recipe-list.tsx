import type { Recipe } from "@/lib/types";
import { RecipeCard } from "./recipe-card";

type RecipeListProps = {
    recipes?: Recipe[];
}

export function RecipeList({ recipes }: RecipeListProps) {
    if (!recipes || recipes.length === 0) return null;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map((recipe, index) => (
                <RecipeCard key={index} recipe={recipe} />
            ))}
        </div>
    )
}
