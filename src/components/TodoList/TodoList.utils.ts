export const generateTodoListCountText = (itemCount: number): string => {
  if (!itemCount || isNaN(itemCount) || itemCount < 1) return '';

  return `${itemCount} ${itemCount === 1 ? 'item' : 'items'} left`;
};
