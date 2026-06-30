import { cn } from '../../utils/helpers';

/** Generic surface container used for dashboard cards, panels, and sections. */
export default function Card({ children, className = '', padded = true, hoverable = false, as: Tag = 'div', ...rest }) {
  return (
    <Tag
      className={cn(
        'rounded-xl2 border border-ink-100 dark:border-ink-700 bg-white dark:bg-ink-800 shadow-card',
        hoverable && 'transition-shadow duration-200 hover:shadow-card-hover',
        padded && 'p-5',
        className
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}
