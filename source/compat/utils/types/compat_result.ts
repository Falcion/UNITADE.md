export default interface ICompatResult {
    /** 
     * @description
     * Whether migration was performed 
     */
    migrated: boolean;
    versionSource?: string;
    versionTarget?: string;
    errors?: string[];
}

