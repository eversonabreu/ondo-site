// Configurações Globais Públicas
const APP_CONFIG = {
    adsense: {
        enabled: true, 
        clientId: 'ca-pub-XXXXXXXXXXXXXXXX', 
        adSlotId: 'XXXXXXXXXX'
    },
    // Links fictícios das lojas (Altere aqui quando publicar)
    storeUrls: {
        googlePlay: 'https://play.google.com/store/apps/details?id=br.com.evertech.ondo',
        appStore: 'https://apps.apple.com/br/app/ondo/id000000000'
    }
};

// Função para injetar componentes HTML
async function loadComponent(elementId, filePath) {
    try {
        const response = await fetch(filePath);
        if (!response.ok) throw new Error(`Falha ao carregar ${filePath}`);
        
        const html = await response.text();
        document.getElementById(elementId).innerHTML = html;
    } catch (error) {
        console.error("Erro na injeção de componente:", error);
    }
}

// Controle do Menu Mobile
function toggleMenu() {
    const sidebar = document.getElementById('sidebar-left-container');
    if (sidebar) {
        sidebar.classList.toggle('active');
    }
}

// Inicialização da Aplicação
document.addEventListener('DOMContentLoaded', async () => {
    
	const playStoreBtn = document.getElementById('btn-playstore');
    const appStoreBtn = document.getElementById('btn-appstore');
    
    if (playStoreBtn) playStoreBtn.href = APP_CONFIG.storeUrls.googlePlay;
    if (appStoreBtn) appStoreBtn.href = APP_CONFIG.storeUrls.appStore;
	
    // Carrega os menus paralelamente para maior performance
    await Promise.all([
        loadComponent('sidebar-left-container', 'sidebar-left.html'),
        loadComponent('sidebar-right-container', 'sidebar-right.html')
    ]);

    // Lógica para inicializar o AdSense apenas se estiver habilitado e após o componente ser injetado
    if (APP_CONFIG.adsense.enabled) {
        try {
            (adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) {
            console.warn("AdSense bloqueado ou não carregado:", e);
        }
    }
});

// Fecha o menu lateral no mobile ao clicar fora dele
document.addEventListener('click', (event) => {
    const sidebar = document.getElementById('sidebar-left-container');
    const menuBtn = document.querySelector('.mobile-menu-btn');
    
    // Verifica se a sidebar existe e se está aberta (tem a classe 'active')
    if (sidebar && sidebar.classList.contains('active')) {
        // Se o clique NÃO foi dentro da sidebar E NÃO foi no botão de abrir
        if (!sidebar.contains(event.target) && event.target !== menuBtn) {
            sidebar.classList.remove('active');
        }
    }
});