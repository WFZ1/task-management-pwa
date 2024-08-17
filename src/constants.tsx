import { ArrowDownIcon, ArrowRightIcon, ArrowUpIcon } from '@radix-ui/react-icons';

export const PRIORITIES = [
    {
        label: 'Low',
        value: 'low',
        icon: ArrowDownIcon,
    },
    {
        label: 'Medium',
        value: 'medium',
        icon: ArrowRightIcon,
    },
    {
        label: 'High',
        value: 'high',
        icon: ArrowUpIcon,
    },
];

export const COMPLETED = [
    {
        label: 'Done',
        value: 'true',
    },
    {
        label: 'Todo',
        value: 'false',
    },
];

export const DATE_FORMAT = 'MMM dd, yyyy';

export const SORTING_TYPE = {
    ASC: 'asc',
    DESC: 'desc'
};