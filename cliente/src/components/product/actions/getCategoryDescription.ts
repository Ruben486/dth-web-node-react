
import { useAllCategories } from '../../categoriy/hooks/fetchCategories'

export const getCategoryDescription = (categoryId) => {
  const { data: categories } = useAllCategories();
  const category = categories?.find((category) => {
    return category._id === categoryId
  });

  return (
    category?.descripcion
    )
};
