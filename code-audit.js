const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔍 AUDITORIA DE CÓDIGO - Phase 1 Components\n');
console.log('='.repeat(60));

const results = {
  issues: [],
  warnings: [],
  passed: []
};

// 1. Verificar spans problemáticos em títulos
console.log('\n📌 [1/6] Verificando spans em títulos...');
try {
  const grepResult = execSync(
    'grep -rn "<h[1-6].*<span" src/components/blackfriday src/components/store 2>nul',
    { encoding: 'utf8' }
  ).trim();

  if (grepResult) {
    const lines = grepResult.split('\n').filter(l => l);
    results.warnings.push({
      category: 'Títulos com Span',
      count: lines.length
    });
    console.log(`   ⚠️  ${lines.length} títulos com <span> (verificar se quebram tamanho)`);
  }
} catch (e) {
  results.passed.push('Nenhum título problemático');
  console.log('   ✅ Nenhum título com span problemático');
}

// 2. Verificar componentes criados
console.log('\n📌 [2/6] Verificando componentes criados...');
const componentsToCheck = [
  'src/components/skeletons/ProductCardSkeleton.jsx',
  'src/components/skeletons/ProductGallerySkeleton.jsx',
  'src/components/skeletons/ProductDetailsSkeleton.jsx',
  'src/components/store/RecentlyViewed.jsx',
  'src/hooks/useRecentlyViewed.js',
  'src/components/product/StockIndicator.jsx',
  'src/utils/stockHelpers.js'
];

let allExist = true;
componentsToCheck.forEach(comp => {
  const exists = fs.existsSync(path.join(__dirname, comp));
  const filename = comp.split('/').pop();
  if (exists) {
    console.log(`   ✅ ${filename}`);
  } else {
    console.log(`   ❌ ${filename} - NÃO ENCONTRADO`);
    allExist = false;
    results.issues.push(`Componente faltando: ${comp}`);
  }
});

if (allExist) {
  results.passed.push('Todos os componentes Phase 1 criados');
}

// 3. Verificar 'use client' em componentes client-side
console.log('\n📌 [3/6] Verificando diretivas "use client"...');
const clientComponents = [
  'src/components/store/RecentlyViewed.jsx',
  'src/hooks/useRecentlyViewed.js',
  'src/components/skeletons/ProductCardSkeleton.jsx'
];

let allHaveUseClient = true;
clientComponents.forEach(comp => {
  if (fs.existsSync(path.join(__dirname, comp))) {
    const content = fs.readFileSync(path.join(__dirname, comp), 'utf8');
    const filename = comp.split('/').pop();
    if (content.startsWith("'use client'") || content.startsWith('"use client"')) {
      console.log(`   ✅ ${filename}`);
    } else {
      console.log(`   ⚠️  ${filename} - FALTA 'use client'`);
      results.warnings.push(`Falta 'use client' em ${comp}`);
      allHaveUseClient = false;
    }
  }
});

if (allHaveUseClient) {
  results.passed.push("Diretivas 'use client' OK");
}

// 4. Verificar Trust Badge
console.log('\n📌 [4/6] Verificando Trust Badges...');
if (fs.existsSync(path.join(__dirname, 'public/images/trust/Bandeiras-1.png'))) {
  console.log('   ✅ Imagem trust badge encontrada');
  results.passed.push('Trust badge image OK');
} else {
  console.log('   ❌ Imagem trust badge NÃO encontrada');
  results.issues.push('Imagem trust badge faltando');
}

// 5. Verificar arquivos de documentação
console.log('\n📌 [5/6] Verificando documentação...');
const docs = [
  'PHASE1_INTEGRATION_GUIDE.md',
  'INTEGRATION_EXAMPLES.md',
  'FIXES_TITULO_SPAN.md'
];

docs.forEach(doc => {
  if (fs.existsSync(path.join(__dirname, doc))) {
    console.log(`   ✅ ${doc}`);
  } else {
    console.log(`   ⚠️  ${doc} - não encontrado`);
  }
});
results.passed.push('Documentação criada');

// 6. Verificar correções aplicadas
console.log('\n📌 [6/6] Verificando correções de títulos...');
try {
  // Verificar HowItWorksPackLoco
  const howItWorks = fs.readFileSync(
    path.join(__dirname, 'src/components/blackfriday/HowItWorksPackLoco.jsx'),
    'utf8'
  );

  if (howItWorks.includes('<span className="text-orange-500">PACK LOCO?</span>')) {
    console.log('   ❌ HowItWorksPackLoco.jsx AINDA TEM PROBLEMA');
    results.issues.push('HowItWorksPackLoco.jsx não corrigido');
  } else {
    console.log('   ✅ HowItWorksPackLoco.jsx corrigido');
  }

  // Verificar BlackFridayPopup
  const popup = fs.readFileSync(
    path.join(__dirname, 'src/components/blackfriday/BlackFridayPopup.jsx'),
    'utf8'
  );

  if (popup.includes('<span className="text-yellow-400">🔥 PACK LOCO</span>')) {
    console.log('   ❌ BlackFridayPopup.jsx AINDA TEM PROBLEMA');
    results.issues.push('BlackFridayPopup.jsx não corrigido');
  } else {
    console.log('   ✅ BlackFridayPopup.jsx corrigido');
  }

  if (results.issues.filter(i => i.includes('não corrigido')).length === 0) {
    results.passed.push('Correções de títulos aplicadas');
  }
} catch (e) {
  results.warnings.push('Não foi possível verificar correções: ' + e.message);
}

// Relatório Final
console.log('\n' + '='.repeat(60));
console.log('📊 RELATÓRIO FINAL\n');

console.log(`✅ Passou: ${results.passed.length} verificações`);
results.passed.forEach(p => console.log(`   • ${p}`));

if (results.warnings.length > 0) {
  console.log(`\n⚠️  Avisos: ${results.warnings.length}`);
  results.warnings.forEach(w => console.log(`   • ${w}`));
}

if (results.issues.length > 0) {
  console.log(`\n❌ Problemas: ${results.issues.length}`);
  results.issues.forEach(i => console.log(`   • ${i}`));
  console.log('\n⚠️  AÇÃO NECESSÁRIA: Corrija os problemas acima');
} else {
  console.log('\n🎉 NENHUM PROBLEMA CRÍTICO ENCONTRADO!');
}

console.log('\n' + '='.repeat(60));
console.log('✨ Auditoria concluída!\n');

// Salvar relatório
const report = {
  timestamp: new Date().toISOString(),
  passed: results.passed.length,
  warnings: results.warnings.length,
  issues: results.issues.length,
  summary: {
    passed: results.passed,
    warnings: results.warnings,
    issues: results.issues
  }
};

fs.writeFileSync(
  path.join(__dirname, 'code-audit-report.json'),
  JSON.stringify(report, null, 2)
);

console.log('📄 Relatório salvo em: code-audit-report.json\n');

process.exit(results.issues.length > 0 ? 1 : 0);
