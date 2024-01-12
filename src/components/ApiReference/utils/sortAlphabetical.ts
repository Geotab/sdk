interface ObjectProperty {
    name: string;
    description: string;
}

interface MethodParameter {
    name: string;
    description: string;
    required: boolean;
}

interface ObjectDetails {
    description: string;
    properties: ObjectProperty[];
}

interface MethodDetails {
    description: string;
    parameters: MethodParameter[];
    returns?: string;
    example?: string;
}

type SortableEntry = [string, ObjectDetails | MethodDetails];

export default function sortAlphabetical(a: SortableEntry, b: SortableEntry) {
    if (a[0] < b[0]) {
        return -1;
    }

    if (a[0] > b[0]) {
        return 1;
    }

    return 0;
}