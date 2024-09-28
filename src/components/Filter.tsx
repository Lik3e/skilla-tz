import Select, { OnChangeValue } from "react-select";

const optionsIncoming = [
  { value: 'all', label: 'Все типы' },
  { value: 'outgoing', label: 'Входящие' },
  { value: 'incoming', label: 'Исходящие' },
];

const optionsDate = [
  { value: '3', label: '3 Дня' },
  { value: '7', label: 'Неделя' },
  { value: '30', label: 'Месяц' },
  { value: '365', label: 'Год' },
];

interface IProps {
  incoming?: string
  date_start?: string
  date_end?: string
  onChangeIncoming?: (i: string) => void
  onChangeDate?: (i: string) => void
  onPickDate?: (from: string, to: string) => void
}

const customStyles = {
  control: (provided: any) => ({
    ...provided,
    background: 'transparent',
    display: 'flex',
    flexWrap: 'nowrap',
    border: "none",
    width: '9em',
    boxShadow: "none",
    color: "#5E7793",
    fontSize: "14px",
    cursor: 'pointer',
  }),
  singleValue: (provided: any) => ({
    ...provided,
    color: "#5E7793"
  }),
  option: (provided: any, {isSelected, isFocused, isDisabled}: any) => (
    {
      ...provided,
      color: "#5E7793",
      backgroundColor: isSelected ? '#D8E4FB' : isFocused ? '#F1F4F9' : null,
      cursor: isDisabled ? 'not-allowed' : 'pointer',
    }
  ),
  menu: (provided: any) => ({
    ...provided,
    width: '9em',
  }),
};

const customStylesDate = {
  control: (provided: any) => ({
    ...provided,
    background: 'transparent',
    display: 'flex',
    flexWrap: 'nowrap',
    border: "none",
    boxShadow: "none",
    fontSize: "14px",
    cursor: 'pointer',
    color: "#5E7793",
  }),
  singleValue: (provided: any) => ({
    ...provided,
    color: "#5E7793"
  }),
  option: (provided: any, {isSelected, isFocused, isDisabled}: any) => (
    {
      ...provided,
      color: "#5E7793",
      backgroundColor: isSelected ? '#D8E4FB' : isFocused ? '#F1F4F9' : null,
      cursor: isDisabled ? 'not-allowed' : 'pointer',
    }
  ),
  menu: (provided: any) => ({
    ...provided,
    width: '20em',
    position: "absolute",
    right: "0"
  }),
};

const Filter = (props: IProps) => {

  const handleChangeIncoming = (val: OnChangeValue<any, any>) => {
    props.onChangeIncoming && props.onChangeIncoming(val.value)
  }

  const handleChangeDate = (val: OnChangeValue<any, any>) => {
    props.onChangeDate && props.onChangeDate(val.value)
  }

  const handleButtonDate = (i: string) => {
    // props.onChangeDate && props.onChangeDate(i)
  }

  const handleChangeFrom = (val: string) => {
    props.onPickDate && props.onPickDate(val, props.date_end ?props.date_end : "")
  }

  const handleChangeTo = (val: string) => {
    props.onPickDate && props.onPickDate(props.date_start ? props.date_start : "", val)
  }

  const CustomMenu = ({ innerRef, innerProps, isDisabled, children }: any) =>
    !isDisabled ? (
      <div ref={innerRef} {...innerProps}>
                {children}
        <div style={{ padding: "10px", paddingTop: "15px",     color: "#122945", }}>
            <div style={{width: "100%"}}>
            Указать дату
            </div>
            <div>
              <input type="date" className="input-from" value={props.date_start} onChange={val => handleChangeFrom(val.target.value)} />
              <input type="date" className="input-to" value={props.date_end} onChange={val => handleChangeTo(val.target.value)} />
            </div>
        </div>
      </div>
    ) : null;

    return (
      <div className="filter-container">
        <div>
          <Select
                    isSearchable={false}
            components={{
              IndicatorSeparator: () => null
            }}
          styles={customStyles}
            defaultValue={{value: "all", label: 'Все типы' }}
            onChange={val => handleChangeIncoming(val)}
            options={optionsIncoming}
          />
        </div>

        <div className="date-picker">
          <div className="cursor-pointer" onClick={() => handleButtonDate("1")}>&#60;</div>
          <div className="calendar-icon" />
          <Select
          isSearchable={false}
              components={{
                MenuList: CustomMenu,
                IndicatorSeparator: () => null,
                DropdownIndicator:() => null
              }}
            styles={customStylesDate}
              defaultValue={{value: "3", label: '3 Дня' }}
              onChange={val => handleChangeDate(val)}
              options={optionsDate}
            />
            <div className="cursor-pointer" onClick={() => handleButtonDate("-1")}>&#62;</div>
        </div>

      </div>
    );
  }
  
  export default Filter;