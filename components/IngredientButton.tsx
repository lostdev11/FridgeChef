interface IngredientButtonProps {
  ingredient: string;
  onClick: () => void;
  disabled?: boolean;
}

export default function IngredientButton({ ingredient, onClick, disabled = false }: IngredientButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200
        ${disabled 
          ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
          : 'bg-green-50 text-green-700 hover:bg-green-100 hover:scale-105 active:scale-95 border border-green-200 hover:border-green-300'
        }
      `}
    >
      {ingredient}
    </button>
  );
} 