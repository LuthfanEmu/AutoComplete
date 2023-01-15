import React, { useRef, useState, useEffect } from "react";
import { usePopper } from "react-popper";
import classNames from "classnames";
import { ListedItems } from "./ListedItems";
import useDebounce from "@/hooks/useDebounce";
import { IconInput } from "./IconInput";
import { DOWN_KEY, ENTER_KEY, ESC_KEY, UP_KEY } from "@/constants";
import useOutsideAlerter from "@/hooks/useOutsiderClick";

const Dropdown = (Props) => {
  const { data, title, disabled, loading, setOpen, setClose } = Props;
  const inputRef = useRef();
  const listRef = useRef();
  const listItemRef = useRef();
  useOutsideAlerter(listRef);
  const { styles, attributes } = usePopper(inputRef.current, listRef.current, {
    placement: "bottom-start",
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [0, 10],
        },
      },
    ],
  });

  const [settings, setSettings] = useState({
    active: 0,
    filtered: [],
    userInput: "",
  });
  const debouncedValue = useDebounce(settings.userInput, 500);

  const onChange = (e) => {
    const userInput = e.currentTarget.value;

    if (loading && userInput.length <= 0) {
      setClose();
    }

    setSettings({
      active: settings.active,
      filtered: settings.filtered,
      userInput: userInput,
    });
  };

  useEffect(() => {
    let filteredData;
    if (debouncedValue.length > 0)
      filteredData = data.filter(
        (d) => d?.name.toLowerCase().indexOf(debouncedValue.toLowerCase()) != -1
      );

    setSettings({
      active: settings.active,
      filtered: filteredData,
      userInput: settings.userInput,
    });
  }, [debouncedValue]);

  const closeList = () => {
    setSettings({
      active: settings.active,
      filtered: settings.filtered,
      userInput: "",
    });
  };

  const onKeyDown = (e) => {
    const { active, filtered } = settings;
    if (e.keyCode === ENTER_KEY) {
      // setSettings({
      //   active: active - 1,
      //   filtered: settings.filtered,
      //   userInput: filtered[active],
      // });
      listItemRef.current.clickItem();
    } else if (e.keyCode === UP_KEY) {      
      if (active === 0) {
        return;
      }
      setSettings({
        active: active - 1,
        filtered: settings.filtered,
        userInput: settings.userInput,
      });
    } else if (e.keyCode === DOWN_KEY) {      
      if (active - 1 === filtered?.length) {
        return;
      }
      setSettings({
        active: active + 1,
        filtered: settings.filtered,
        userInput: settings.userInput,
      });
    } else if (e.keyCode === ESC_KEY) {
      console.log("Closed by ESC");
      closeList();
    }
  };  

  const onListedClick = (e) => {
    // console.log(e);
  };

  return (
    <div className="relative p-4 h-28 m-auto flex flex-col overflow-visible w-full">
      <p className="mb-2">{title}</p>
      <div ref={inputRef} className="w-full" onClick={setOpen ? setOpen : null}>
        <IconInput
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={settings.value}
          disabled={disabled}
          isLoading={loading}
        />
        <div
          className={classNames("flex z-10", {
            "invisible pointer-events-none":
              debouncedValue.length > 0 ? false : true,
          })}
          ref={listRef}
          style={styles.popper}
          {...attributes.popper}
        >
          {settings.filtered?.length > 0 && (
            <ListedItems
              ref={listItemRef}
              active={settings.active}
              items={settings.filtered}
              onListClick={(e) => onListedClick(e)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

Dropdown.defaultProps = {
  data: [],
};

export default Dropdown;
