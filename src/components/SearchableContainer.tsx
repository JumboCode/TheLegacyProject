interface SearchableContainerProps<T> {
  addElementComponent?: React.ReactNode;
  className?: string;
  display: (elem: T) => React.ReactNode;
  elements: T[];
  search?: (elem: T) => boolean;
}

const SearchableContainer = <T,>({
  addElementComponent,
  className = "",
  display,
  elements,
  search = () => true,
}: SearchableContainerProps<T>) => {
  return (
    <div className={className}>
      {addElementComponent && addElementComponent}
      {elements.filter((e) => search(e)).map((e) => display(e))}
    </div>
  );
};

export default SearchableContainer;
