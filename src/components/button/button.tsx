interface Props {
  width?: string;
  onClick?: any;
  children?: any;
  disabled?: boolean;
  btnBorderWhite?: string;
  btnPrimary?: string;
  btnWhite?: string;
  btnBorderPrimary?: string;
  btnBorderDarkGrey?: string;
  btnBorderDanger?: string;
  type?: any;
}

export const Button = ({ width, onClick, type, children, disabled, btnBorderWhite, btnPrimary, btnWhite, btnBorderPrimary, btnBorderDarkGrey, btnBorderDanger }: Props) => {
  return (
    <button type={type} className={`btn ${btnBorderWhite} ${btnPrimary} ${btnWhite} ${btnBorderPrimary} ${btnBorderDarkGrey} ${btnBorderDanger}  ${width} border-r`} onClick={onClick} role={type} disabled={disabled}>
      {children}
    </button>
  );
};
