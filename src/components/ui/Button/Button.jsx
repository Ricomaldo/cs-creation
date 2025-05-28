import styles from './Button.module.scss';

export const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium',
  disabled = false,
  onClick,
  ...props 
}) => {
  const className = `${styles.button} ${styles[variant]} ${styles[size]} ${
    disabled ? styles.disabled : ''
  }`;

  return (
    <button 
      className={className}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};