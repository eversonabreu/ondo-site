// Configurações Globais Públicas
const APP_CONFIG = {
    adsense: {
        enabled: true, // Mude para false quando quiser testar localmente sem erros no console
        clientId: 'ca-pub-XXXXXXXXXXXXXXXX', 
        adSlotId: 'XXXXXXXXXX'
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