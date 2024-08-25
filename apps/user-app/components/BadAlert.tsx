type BadAlertProps = {
    message: string;
};

export function BadAlert({ message }: BadAlertProps) {
    return (
        <div
            className="mt-2 bg-red-100 border border-red-200 text-sm text-red-800 rounded-lg p-4 dark:bg-red-800/10 dark:border-red-900 dark:text-red-500"
            role="alert"
            tabIndex={-1}
            aria-labelledby="hs-soft-color-danger-label"
        >
            <span id="hs-soft-color-danger-label" className="font-bold">
                Error
            </span>{" "}
            {message}
        </div>
    );
}


export function GoodAlert({ message }: BadAlertProps) {
    return (
        <div
        className="mt-2 bg-teal-100 border border-teal-200 text-sm text-teal-800 rounded-lg p-4 dark:bg-teal-800/10 dark:border-teal-900 dark:text-teal-500"
            role="alert"
            tabIndex={-1}
            aria-labelledby="hs-soft-color-success-label"
        >
            <span id="hs-soft-color-success-label" className="font-bold">
                Success
            </span>{" "}
            {message}
        </div>
    );
}
