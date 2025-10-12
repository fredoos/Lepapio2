import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Script d'optimisation des images pour Le Papio
// Ce script analyse les images et propose des optimisations

const publicDir = path.join(__dirname, 'public');
const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];

function getImageFiles() {
  const files = fs.readdirSync(publicDir);
  return files.filter(file => {
    const ext = path.extname(file).toLowerCase();
    return imageExtensions.includes(ext);
  });
}

function getFileSize(filePath) {
  const stats = fs.statSync(filePath);
  return Math.round(stats.size / 1024); // Taille en KB
}

function analyzeImages() {
  const imageFiles = getImageFiles();
  let totalSize = 0;
  
  console.log('\n🖼️  ANALYSE DES IMAGES - Restaurant Le Papio\n');
  console.log('📊 Fichier'.padEnd(30) + 'Taille'.padEnd(10) + 'Recommandation');
  console.log('─'.repeat(70));
  
  imageFiles.forEach(file => {
    const filePath = path.join(publicDir, file);
    const sizeKB = getFileSize(filePath);
    totalSize += sizeKB;
    
    let recommendation = '';
    let status = '✅';
    
    if (sizeKB > 500) {
      recommendation = '🔴 À compresser - Trop volumineux';
      status = '🔴';
    } else if (sizeKB > 200) {
      recommendation = '🟡 Peut être optimisé';
      status = '🟡';
    } else {
      recommendation = '✅ Taille correcte';
      status = '✅';
    }
    
    console.log(`${status} ${file.padEnd(25)} ${(sizeKB + ' KB').padEnd(10)} ${recommendation}`);
  });
  
  console.log('─'.repeat(70));
  console.log(`📈 TOTAL: ${imageFiles.length} images - ${Math.round(totalSize)} KB (${Math.round(totalSize/1024)} MB)`);
  
  return { imageFiles, totalSize };
}

function generateOptimizationRecommendations() {
  console.log('\n🛠️  RECOMMANDATIONS D\'OPTIMISATION\n');
  
  console.log('1. 📐 REDIMENSIONNER LES IMAGES:');
  console.log('   • Photos de galerie: 800px de largeur max');
  console.log('   • Images de fond: 1200px de largeur max');
  console.log('   • Logos/icônes: 200px de largeur max');
  
  console.log('\n2. 🗜️  COMPRESSION:');
  console.log('   • JPG: Qualité 80-85% pour les photos');
  console.log('   • PNG: Utiliser pour les logos avec transparence');
  console.log('   • WebP: Format moderne, -25% à -50% de taille');
  
  console.log('\n3. 🔧 OUTILS RECOMMANDÉS:');
  console.log('   • En ligne: TinyPNG, Squoosh.app');
  console.log('   • Logiciels: GIMP, Photoshop, ImageOptim');
  console.log('   • CLI: imagemin, sharp');
  
  console.log('\n4. 📱 FORMATS ADAPTATIFS:');
  console.log('   • Utiliser srcset pour différentes tailles');
  console.log('   • Images WebP avec fallback JPG');
  console.log('   • Lazy loading pour améliorer les performances');
}

function generateImageOptimizationGuide() {
  console.log('\n📋 GUIDE D\'OPTIMISATION ÉTAPE PAR ÉTAPE\n');
  
  console.log('ÉTAPE 1 - Analyse actuelle:');
  console.log('✓ Script exécuté - Voir les résultats ci-dessus');
  
  console.log('\nÉTAPE 2 - Optimisation manuelle:');
  console.log('1. Ouvrez https://tinypng.com/');
  console.log('2. Glissez-déposez vos images les plus lourdes');
  console.log('3. Téléchargez les versions optimisées');
  console.log('4. Remplacez les originaux dans le dossier public/');
  
  console.log('\nÉTAPE 3 - Vérification:');
  console.log('1. Relancez ce script');
  console.log('2. Vérifiez que les tailles ont diminué');
  console.log('3. Testez votre site pour vérifier la qualité');
  
  console.log('\nÉTAPE 4 - Déploiement:');
  console.log('1. Committez les nouvelles images optimisées');
  console.log('2. Poussez sur votre repository');
  console.log('3. Netlify redéploiera automatiquement');
}

// Fonction principale
function main() {
  console.log('🏠 OPTIMISATION DES IMAGES - RESTAURANT LE PAPIO');
  console.log('══════════════════════════════════════════════════');
  
  try {
    analyzeImages();
    generateOptimizationRecommendations();
    generateImageOptimizationGuide();
    
    console.log('\n✨ ANALYSE TERMINÉE !');
    console.log('\n💡 Conseil: Commencez par optimiser les images > 200 KB');
    console.log('   Cela aura le plus grand impact sur les performances.');
    
  } catch (error) {
    console.error('❌ Erreur lors de l\'analyse:', error.message);
  }
}

// Exécution du script
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { analyzeImages, getImageFiles, getFileSize };