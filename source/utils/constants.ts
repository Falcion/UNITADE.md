/**
 * A class containing constants.
 * 
 * @class
 * @example
 * const audioExtensions = CONSTANTS.defaultExtensions['audio'];
 * console.log(audioExtensions); // ['3gp', 'flac', 'm4a', 'mp3', 'oga', 'ogg', 'opus', 'wav']
 */
export default class CONSTANTS {

    /**
     * A static object that maps file types to their default extensions.
     * 
     * - **audio**: ['3gp', 'flac', 'm4a', 'mp3', 'oga', 'ogg', 'opus', 'wav']
     * - **image**: ['avif', 'bmp', 'gif', 'jpeg', 'jpg', 'png', 'webp']
     * - **video**: ['mkv', 'mov', 'mp4', 'ogv', 'webm']
     * - **pdf**: ['pdf']
     * - **markdown**: ['md']
     * 
     * @type {{ [id: string]: string[] }}
     * @example
     * const videoExtensions = CONSTANTS.defaultExtensions['video'];
     * console.log(videoExtensions); // ['mkv', 'mov', 'mp4', 'ogv', 'webm']
     */
    public static defaultExtensions: {
        [id: string]: string[];
    } = {
            'audio': ['3gp', 'flac', 'm4a', 'mp3', 'oga', 'ogg', 'opus', 'wav'],
            'image': ['avif', 'bmp', 'gif', 'jpeg', 'jpg', 'png', 'webp'],
            'video': ['mkv', 'mov', 'mp4', 'ogv', 'webm'],
            'pdf': ['pdf'],
            'markdown': ['md']
        };

    /**
   * @description An array of file extensions considered "unsafe" (typically binary file formats).
   * These extensions are sourced primarily from https://www.file-extensions.org/filetype/extension/name/binary-files
   * and additional well-known binary file types. This list is used to prevent or warn users when editing these files.
   */
    public static unsafeExtensions: string[] = [
        // Archives
        'zip',  // ZIP archive
        'rar',  // RAR archive
        '7z',   // 7-Zip archive
        'tar',  // Tarball archive
        'gz',   // Gzip compressed file

        // Executable files
        'exe',  // Windows executable
        'bat',  // Batch script
        'cmd',  // Windows command script
        'sh',   // Unix shell script
        'msi',  // Windows installer

        // Disk images
        'iso',  // ISO disk image
        'img',  // Raw disk image

        // Database files
        'db',   // Database file
        'sqlite', // SQLite database

        // Multimedia files (binary)
        'mp4',  // MPEG-4 video
        'avi',  // AVI video
        'mp3',  // MP3 audio
        'flac', // FLAC audio
        'wav',  // WAV audio

        // Document formats (binary-encoded)
        'pdf',  // PDF document
        'doc',  // Microsoft Word document (older format)
        'docx', // Microsoft Word document (modern format)
        'ppt',  // Microsoft PowerPoint presentation (older format)
        'pptx', // Microsoft PowerPoint presentation (modern format)
        'xls',  // Microsoft Excel spreadsheet (older format)
        'xlsx', // Microsoft Excel spreadsheet (modern format)

        // Images (binary-encoded)
        'jpg',  // JPEG image
        'png',  // PNG image
        'gif',  // GIF image
        'bmp',  // Bitmap image
        'tiff', // TIFF image

        // Fonts
        'ttf',  // TrueType font
        'otf',  // OpenType font

        // System and configuration files
        'dll',  // Dynamic-link library (Windows)
        'sys',  // System file (Windows)
        'bin',  // Binary file
        'dat',  // Data file (binary format)

        // Virtual machine and container images
        'vmdk',  // VMware virtual disk
        'ova',   // Open Virtual Appliance
        'qcow2', // QEMU Copy-On-Write 2 disk image

        // Others
        'swf',  // Adobe Flash file
        'psd',  // Adobe Photoshop file
        'reg', // Windows Registry
    ];

    /**
         * Initial theme to be used for rendering.
         * The current out-of-the-box available themes are: 'vs' (default), 'vs-dark', 'hc-black', 'hc-light.**/
    public static themes: Record<string, string> = {
        'vs-dark': 'DARK',
        'vs': 'LIGHT',
        'hc-black': 'PITCH-BLACK',
        'hc-light': 'PITCH-LIGHT',
        'auto': 'AUTO'
    };
}
