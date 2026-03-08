#!/usr/bin/env python3
"""
Script pour créer des images placeholder pour le portfolio
Usage: python3 create_placeholders.py
"""

import os
from pathlib import Path

try:
    from PIL import Image, ImageDraw, ImageFont
    PIL_AVAILABLE = True
except ImportError:
    PIL_AVAILABLE = False
    print("⚠️  Pillow n'est pas installé. Installation...")
    print("    Exécutez: pip3 install Pillow")
    print("    Ou utilisez des URLs de placeholder en ligne")

def create_placeholder_image(width, height, text, filename, color="#d4af37"):
    """Crée une image placeholder avec du texte"""
    if not PIL_AVAILABLE:
        return False
    
    # Créer une image avec un fond
    img = Image.new('RGB', (width, height), color='#f8f8f8')
    draw = ImageDraw.Draw(img)
    
    # Dessiner un rectangle avec la couleur d'accent
    border = 20
    draw.rectangle(
        [border, border, width-border, height-border],
        outline=color,
        width=5
    )
    
    # Ajouter le texte
    try:
        font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 40)
    except:
        font = ImageFont.load_default()
    
    # Centrer le texte
    bbox = draw.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]
    
    x = (width - text_width) / 2
    y = (height - text_height) / 2
    
    draw.text((x, y), text, fill='#1a1a1a', font=font)
    
    # Sauvegarder
    img.save(filename)
    return True

def main():
    """Génère toutes les images placeholder"""
    
    # Créer le dossier images s'il n'existe pas
    images_dir = Path("images")
    images_dir.mkdir(exist_ok=True)
    
    if not PIL_AVAILABLE:
        print("\n❌ Impossible de créer les placeholders sans Pillow")
        print("\n💡 Alternatives:")
        print("   1. Installez Pillow: pip3 install Pillow")
        print("   2. Téléchargez vos propres images")
        print("   3. Utilisez https://via.placeholder.com/ ou https://picsum.photos/")
        return
    
    print("🎨 Création des images placeholder...\n")
    
    # Définir toutes les images à créer
    images = [
        # Hero et profile
        (1920, 1080, "Hero Background", "hero-bg.jpg"),
        (800, 800, "Profile", "profile.jpg"),
        
        # Projets
        *[(1200, 800, f"Projet {i}", f"project{i}.jpg") for i in range(1, 13)],
        
        # Video posters
        (1200, 800, "Video 1", "video1-poster.jpg"),
        (1200, 800, "Video 2", "video2-poster.jpg"),
        
        # Logos formations
        (200, 200, "IUT", "iut-logo.png"),
        (200, 200, "MTU", "munster-logo.png"),
        (200, 200, "Sup", "supluxe-logo.png"),
        
        # Certifications
        *[(800, 600, f"Certification {i}", f"cert{i}.jpg") for i in range(1, 5)],
        
        # Skills
        (100, 100, "PS", "skill-photoshop.png"),
        (100, 100, "AI", "skill-illustrator.png"),
        (100, 100, "ID", "skill-indesign.png"),
        (100, 100, "CN", "skill-canva.png"),
        (100, 100, "PR", "skill-premiere.png"),
        (100, 100, "FG", "skill-figma.png"),
        (100, 100, "WP", "skill-wordpress.png"),
        (100, 100, "WX", "skill-wix.png"),
        (100, 100, "SH", "skill-shopify.png"),
        (100, 100, "MC", "skill-mailchimp.png"),
        (100, 100, "GA", "skill-analytics.png"),
        (100, 100, "SEO", "skill-seo.png"),
        
        # Projets détaillés
        (1200, 800, "Blog", "blog-creation.jpg"),
        (1200, 800, "Website", "website-management.jpg"),
        (1200, 800, "E-commerce", "e-merchandising.jpg"),
        (1200, 800, "Newsletter", "newsletters-ai.jpg"),
        (1200, 800, "Vitrine", "merchandising-vitrine.jpg"),
    ]
    
    created = 0
    for width, height, text, filename in images:
        filepath = images_dir / filename
        if create_placeholder_image(width, height, text, filepath):
            print(f"✅ {filename}")
            created += 1
        else:
            print(f"❌ {filename}")
    
    print(f"\n🎉 {created}/{len(images)} images créées avec succès!")
    print(f"📁 Images sauvegardées dans: {images_dir.absolute()}")
    print("\n💡 Remplacez ces placeholders par vos vraies images!")

if __name__ == "__main__":
    main()
