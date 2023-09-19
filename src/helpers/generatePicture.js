export default function generatePictureByName(name) {
	return 'https://ui-avatars.com/api/?name=' + name.trim().replace(/\s/g, ' ').split(' ').join('+');
}
