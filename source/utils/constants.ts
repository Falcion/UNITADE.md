export default class CONSTANTS {
    public static defaultExtensions: {
        [id: string]: string[];
    } = {
            'audio': ['3gp', 'flac', 'm4a', 'mp3', 'oga', 'ogg', 'opus', 'wav'],
            'image': ['avif', 'bmp', 'gif', 'jpeg', 'jpg', 'png', 'webp'],
            'video': ['mkv', 'mov', 'mp4', 'ogv', 'webm'],
            'pdf': ['pdf'],
            'markdown': ['md']
        };
}
