import usePlacesAutocomplete from "use-places-autocomplete";
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption } from "@reach/combobox";
import { ChangeEvent } from "react";

import styles from "./mapSearch.module.scss";

export const SearchMap = () => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {},
    // debounce: 300,
  });
  const handleInput = (e: ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.value);
  };

  const handleSelect = (val: string): void => {
    setValue(val, false);
  };

  return (
    <div className="App">
      <Combobox onSelect={handleSelect} aria-labelledby="demo">
        <ComboboxInput className={styles.search} value={value} onChange={handleInput} disabled={!ready} placeholder="أدخل اسم البلد" />
        <ComboboxPopover>
          <ComboboxList>{status === "OK" && data.map(({ place_id, description }: any) => <ComboboxOption key={place_id} value={description} />)}</ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  );
};
