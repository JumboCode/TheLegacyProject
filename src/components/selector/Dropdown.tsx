import { Spinner } from "@components/skeleton";
import { faCaretDown, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

type IdentifiableObject = { id: string };

interface DropdownProps<T extends IdentifiableObject> {
  header: string;
  display: (ele: T) => React.ReactNode;
  elements: T[];
  selected: T[];
  setSelected: (ele: T) => void;
  onSave: () => Promise<any>;
  multipleChoice?: boolean;
}

const Dropdown = <T extends IdentifiableObject>(props: DropdownProps<T>) => {
  const { header, display, elements, selected, setSelected } = props;
  const multipleChoice = props.multipleChoice ?? true;
  const [displayDropdown, setDisplayDropdown] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [_, startTransition] = React.useTransition();

  const onDisplayDropdown = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setDisplayDropdown(!displayDropdown);
  };

  const onSave = () => {
    setLoading(true);
    props.onSave().then(() => setLoading(false));
  };

  const onCheck = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    element: T
  ) => {
    e.stopPropagation();
    startTransition(() => {
      setSelected(element);
    });
  };

  // TODO(nickbar01234) - Handle click outside
  return (
    <div className="relative w-full">
      <div
        className="flex cursor-pointer items-center justify-between rounded-lg border border-dark-teal bg-tan px-4 py-1.5"
        onClick={onDisplayDropdown}
      >
        <span className="text-dark-teal">{header}</span>
        <FontAwesomeIcon icon={faCaretDown} className="text-dark-teal" />
      </div>
      {displayDropdown && (
        <div className="absolute z-50 mt-2 inline-block w-full rounded border border-dark-teal bg-tan p-4">
          <div className="flex min-h-[128px] flex-col justify-between gap-y-3">
            <div className="flex max-h-[128px] flex-col gap-y-3 overflow-y-auto">
              {elements.map((element, idx) => (
                <div
                  key={idx}
                  className="flex cursor-pointer items-center gap-1.5 text-dark-teal"
                  onClick={(e) => onCheck(e, element)}
                >
                  <button
                    className={`flex h-4 w-4 items-center justify-center border-2 border-dark-teal ${
                      !multipleChoice && "rounded-full"
                    }`}
                  >
                    {selected.some((other) => element.id === other.id) &&
                      (multipleChoice ? (
                        <FontAwesomeIcon icon={faCheck} size="xs" />
                      ) : (
                        <div className="h-full w-full bg-dark-teal" />
                      ))}
                  </button>
                  <span className="overflow-hidden truncate">
                    {display(element)}
                  </span>
                </div>
              ))}
            </div>
            {loading ? (
              <div className="flex w-full justify-center">
                <Spinner height={8} width={8} />
              </div>
            ) : (
              <button
                className="rounded bg-dark-teal px-6 py-2.5 text-white"
                onClick={onSave}
              >
                Save Changes
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
