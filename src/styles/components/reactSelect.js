export const reactSelectStyles = {
  control: (base, state) => ({
    ...base,
    minHeight: "unset",
    padding: "0.5rem",
    backgroundColor: "var(--input-bg)",
    border: `1px solid ${
      state.isFocused ? "var(--color-brand)" : "var(--border-default)"
    }`,
    borderRadius: 0,
    boxShadow: "none",
    fontFamily: "var(--font-secondary)",
    fontSize: "1rem",
    fontWeight: 500,
    transition:
      "border-color var(--transition-fast) ease, background-color var(--transition-fast) ease",

    "&:hover": {
      borderColor: state.isFocused
        ? "var(--color-brand)"
        : "var(--border-default)",
    },
  }),

  valueContainer: (base) => ({
    ...base,
    padding: 0,
  }),

  input: (base) => ({
    ...base,
    margin: 0,
    padding: 0,
    color: "var(--text-primary)",
  }),

  placeholder: (base) => ({
    ...base,
    color: "var(--input-placeholder)",
  }),

  singleValue: (base) => ({
    ...base,
    color: "var(--text-primary)",
  }),

  indicatorSeparator: () => ({
    display: "none",
  }),

  dropdownIndicator: (base) => ({
    ...base,
    color: "var(--text-muted)",

    "&:hover": {
      color: "var(--color-brand)",
    },
  }),

  clearIndicator: (base) => ({
    ...base,
    color: "var(--text-muted)",

    "&:hover": {
      color: "var(--color-brand)",
    },
  }),

  menu: (base) => ({
    ...base,
    border: "1px solid var(--border-default)",
    borderRadius: 0,
    boxShadow: "none",
    overflow: "hidden",
  }),

  menuList: (base) => ({
    ...base,
    padding: 0,
  }),

  option: (base, state) => ({
    ...base,
    fontFamily: "var(--font-secondary)",
    fontSize: "1rem",
    fontWeight: 500,
    backgroundColor: state.isSelected
      ? "var(--color-brand)"
      : state.isFocused
        ? "var(--surface-muted)"
        : "white",
    color: state.isSelected ? "white" : "var(--text-primary)",
    cursor: "pointer",
  }),
};
