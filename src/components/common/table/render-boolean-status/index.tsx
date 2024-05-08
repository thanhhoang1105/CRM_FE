export const renderBooleanStatus = (value: boolean, trueText: string) => (
    <div className={'not-' + trueText.toLowerCase()}>
        {value ? (
            <img src="/media/icons/check-green.svg" alt={trueText.toLowerCase()} />
        ) : (
            <img src="/media/icons/uncheck-red.svg" alt={'not-' + trueText.toLowerCase()} />
        )}
    </div>
);
