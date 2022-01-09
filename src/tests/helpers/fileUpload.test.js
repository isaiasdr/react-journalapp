import 'setimmediate';
import cloudinary from 'cloudinary';
import { fileUpload } from '../../helpers/fileUpload';


cloudinary.config({ 
    cloud_name: 'delx45kxv', 
    api_key: '571618262265788', 
    api_secret: 'hzZ4dnfzBvYd_xjt5F-OUbVxtPc',
    secure: true
});

describe('Tests in fileUpload', () => {
    test('should load the file and return a URL', async () => {
        const resp = await fetch('https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60');
        const blob = await resp.blob();

        const file = new File([blob], 'foto.png');
        const url = await fileUpload(file);

        expect( typeof url ).toBe( 'string' );

        const segments = url.split('/');
        const imageId = segments[segments.length - 1].replace('.png', '');

        cloudinary.v2.api.delete_resources(`samples/${imageId}`, {}, () => {
            
        });
    });

    test('should load the file and return a URL', async () => {
        const file = new File([], 'foto.png');
        const url = await fileUpload(file);

        expect( url ).toBe( null );
    });
});
