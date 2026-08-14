import { useEffect, useRef, useState } from "react";

import * as S from "../../styles/Settings/ComboBoxField";

interface ComboBoxFieldProps {
  value: string;
  options: string[];
  placeholder: string;
  ariaLabel: string;
  onChange: (value: string) => void;
  onAddOption: (value: string) => void;
}

export default function ComboBoxField({
  value,
  options,
  placeholder,
  ariaLabel,
  onChange,
  onAddOption,
}: ComboBoxFieldProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredOptions = isFiltering
    ? options.filter((option) =>
        option.toLowerCase().includes(value.trim().toLowerCase())
      )
    : options;

  const trimmedValue = value.trim();
  const canAddNewOption =
    trimmedValue.length > 0 &&
    !options.some((option) => option === trimmedValue);

  const handleSelect = (option: string) => {
    onChange(option);
    setIsOpen(false);
  };

  const handleAdd = () => {
    if (!canAddNewOption) return;

    onAddOption(trimmedValue);
    onChange(trimmedValue);
    setIsOpen(false);
  };

  return (
    <S.Wrapper ref={wrapperRef}>
      <S.Input
        value={value}
        placeholder={placeholder}
        aria-label={ariaLabel}
        onFocus={() => {
          setIsOpen(true);
          setIsFiltering(false);
        }}
        onChange={(e) => {
          onChange(e.target.value);
          setIsFiltering(true);
        }}
      />

      {isOpen && (
        <S.Dropdown>
          {filteredOptions.map((option) => (
            <S.Option key={option} onClick={() => handleSelect(option)}>
              {option}
            </S.Option>
          ))}

          {filteredOptions.length === 0 && !canAddNewOption && (
            <S.EmptyOption>목록이 없습니다.</S.EmptyOption>
          )}

          {canAddNewOption && (
            <S.AddOption onClick={handleAdd}>
              + "{trimmedValue}" 추가하기
            </S.AddOption>
          )}
        </S.Dropdown>
      )}
    </S.Wrapper>
  );
}
