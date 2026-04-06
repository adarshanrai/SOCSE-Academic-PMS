import os

try:
    from PIL import Image
except ImportError:
    os.system("pip install Pillow")
    from PIL import Image

def get_dominant_colors():
    try:
        img = Image.open('src/assets/msu_logo.png').convert('RGBA')
        colors = img.getcolors(maxcolors=1000000)
        
        if not colors:
            print("Too many colors or error")
            return
            
        valid_colors = []
        for count, rgba in colors:
            r, g, b, a = rgba
            # filter out transparent pixels, pure whites, and pure blacks to find the brand colors
            if a > 200 and not (r > 240 and g > 240 and b > 240) and not (r < 20 and g < 20 and b < 20):
                valid_colors.append((count, (r, g, b)))
                
        valid_colors.sort(reverse=True)
        
        print("Top 5 dominant logo colors:")
        for count, (r, g, b) in valid_colors[:5]:
            print(f"#{r:02x}{g:02x}{b:02x} - pixel count: {count}")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == '__main__':
    get_dominant_colors()
