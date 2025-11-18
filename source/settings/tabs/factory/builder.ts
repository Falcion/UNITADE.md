export interface IUnitadeTabBuilder {
    defaults?: {
        color: string
        borderColor: string
        borderWidth: string
    };
    /**
     * Used to update state of current tab.
     * @abstract
     */
    updateState(): void;
    /** 
     * Used to update errors of current tab.
     * @abstract
    */
    updateErrors(): void;
    /**
     * Used to update visuals and display of specified
     * settings of current tab.
     * @abstract
     */
    updateDisplays(): void;
}
