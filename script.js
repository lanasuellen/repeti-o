/**
 * 🟣 Site de Números - Design Roxo INCRÍVEL 🟣
 * Script JavaScript principal
 * 
 * Funcionalidades:
 * - Geração dinâmica de números de 1 a 10
 * - Sistema de partículas flutuantes
 * - Interatividade com eventos de clique
 * - Animações e efeitos visuais
 */

// ========================================
// CONFIGURAÇÕES GLOBAIS
// ========================================

const CONFIG = {
    // Configurações das partículas
    particles: {
        count: 30,
        minSize: 4,
        maxSize: 8,
        minDuration: 6,
        maxDuration: 10,
        colors: [
            'linear-gradient(45deg, #8B5CF6, #A855F7, #C084FC)',
            'linear-gradient(45deg, #E879F9, #F0ABFC, #F3E8FF)'
        ]
    },
    
    // Configurações dos números
    numbers: {
        start: 1,
        end: 10,
        animationDelay: 0.2,
        hoverEffects: true
    },
    
    // Configurações de animação
    animations: {
        fadeInDuration: 1,
        hoverScale: 1.08,
        hoverRotation: 2,
        clickScale: 0.85,
        clickRotation: -5
    }
};

// ========================================
// CLASSE PRINCIPAL DO SITE
// ========================================

class NumbersSite {
    constructor() {
        this.numbersList = null;
        this.particlesContainer = null;
        this.isInitialized = false;
        
        // Bind dos métodos
        this.init = this.init.bind(this);
        this.createParticles = this.createParticles.bind(this);
        this.generateNumbers = this.generateNumbers.bind(this);
        this.handleNumberClick = this.handleNumberClick.bind(this);
    }

    /**
     * Inicializa o site
     */
    init() {
        try {
            // Aguardar o carregamento completo da página
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', this.setupSite);
            } else {
                this.setupSite();
            }
        } catch (error) {
            console.error('❌ Erro ao inicializar o site:', error);
        }
    }

    /**
     * Configura o site após o carregamento
     */
    setupSite() {
        try {
            // Obter referências dos elementos
            this.numbersList = document.getElementById('numbersList');
            this.particlesContainer = document.getElementById('particles');

            if (!this.numbersList || !this.particlesContainer) {
                throw new Error('Elementos necessários não encontrados');
            }

            // Criar partículas flutuantes
            this.createParticles();
            
            // Gerar os números
            this.generateNumbers();
            
            // Marcar como inicializado
            this.isInitialized = true;
            
            // Log de sucesso
            console.log('🟣 Site Roxo INCRÍVEL carregado com sucesso!');
            console.log('✨ Prepare-se para ficar chocado com a beleza roxa! ✨');
            
            // Disparar evento personalizado
            this.dispatchCustomEvent('siteLoaded', { 
                timestamp: new Date(),
                config: CONFIG 
            });

        } catch (error) {
            console.error('❌ Erro na configuração do site:', error);
        }
    }

    /**
     * Cria partículas flutuantes
     */
    createParticles() {
        try {
            const { count, minSize, maxSize, minDuration, maxDuration, colors } = CONFIG.particles;

            for (let i = 0; i < count; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                
                // Posicionamento aleatório
                particle.style.left = Math.random() * 100 + '%';
                
                // Tamanho aleatório
                const size = Math.random() * (maxSize - minSize) + minSize;
                particle.style.width = size + 'px';
                particle.style.height = size + 'px';
                
                // Duração e delay aleatórios
                const duration = Math.random() * (maxDuration - minDuration) + minDuration;
                const delay = Math.random() * maxDuration;
                
                particle.style.animationDelay = delay + 's';
                particle.style.animationDuration = duration + 's';
                
                // Cor aleatória
                const colorIndex = i % colors.length;
                particle.style.background = colors[colorIndex];
                
                // Adicionar ao container
                this.particlesContainer.appendChild(particle);
            }

            console.log(`✨ ${count} partículas roxas criadas com sucesso!`);

        } catch (error) {
            console.error('❌ Erro ao criar partículas:', error);
        }
    }

    /**
     * Gera e exibe os números de 1 a 10
     */
    generateNumbers() {
        try {
            const { start, end, animationDelay, hoverEffects } = CONFIG.numbers;
            
            // Estrutura de repetição usando for
            for (let i = start; i <= end; i++) {
                // Criar elemento da lista
                const listItem = document.createElement('li');
                listItem.className = 'number-item fade-in glow-effect';
                listItem.textContent = i;
                
                // Adicionar delay de animação para cada item
                listItem.style.animationDelay = `${i * animationDelay}s`;
                
                // Adicionar evento de clique
                listItem.addEventListener('click', () => this.handleNumberClick(listItem, i));
                
                // Adicionar efeitos de hover se habilitados
                if (hoverEffects) {
                    this.addHoverEffects(listItem);
                }
                
                // Adicionar o item à lista
                this.numbersList.appendChild(listItem);
            }

            console.log(`🔢 Números de ${start} a ${end} gerados com sucesso!`);

        } catch (error) {
            console.error('❌ Erro ao gerar números:', error);
        }
    }

    /**
     * Adiciona efeitos de hover aos números
     */
    addHoverEffects(element) {
        element.addEventListener('mouseenter', () => {
            element.style.cursor = 'pointer';
        });

        element.addEventListener('mouseleave', () => {
            // Reset dos estilos se necessário
        });
    }

    /**
     * Manipula o clique nos números
     */
    handleNumberClick(element, number) {
        try {
            const { clickScale, clickRotation } = CONFIG.animations;
            
            // Efeito visual de clique
            element.style.transform = `scale(${clickScale}) rotate(${clickRotation}deg)`;
            element.style.filter = 'brightness(1.5) hue-rotate(30deg)';
            element.style.boxShadow = '0 0 50px rgba(139, 92, 246, 0.8)';
            
            // Reset após animação
            setTimeout(() => {
                element.style.transform = '';
                element.style.filter = '';
                element.style.boxShadow = '';
            }, 300);
            
            // Mostrar alerta personalizado
            this.showCustomAlert(number);
            
            // Disparar evento personalizado
            this.dispatchCustomEvent('numberClicked', { 
                number: number,
                timestamp: new Date()
            });

        } catch (error) {
            console.error('❌ Erro no clique do número:', error);
        }
    }

    /**
     * Mostra alerta personalizado
     */
    showCustomAlert(number) {
        const messages = [
            `🟣 VOCÊ CLICOU NO NÚMERO ${number}! ROXO INCRÍVEL! 🟣`,
            `✨ Número ${number} selecionado! Que beleza roxa! ✨`,
            `💜 O número ${number} está brilhando de roxo! 💜`,
            `🌟 ${number} é um número mágico em roxo! 🌟`
        ];
        
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        alert(randomMessage);
    }

    /**
     * Dispara eventos personalizados
     */
    dispatchCustomEvent(eventName, data) {
        const event = new CustomEvent(eventName, { 
            detail: data,
            bubbles: true 
        });
        document.dispatchEvent(event);
    }

    /**
     * Obtém estatísticas do site
     */
    getStats() {
        return {
            isInitialized: this.isInitialized,
            numbersCount: this.numbersList ? this.numbersList.children.length : 0,
            particlesCount: this.particlesContainer ? this.particlesContainer.children.length : 0,
            config: CONFIG
        };
    }

    /**
     * Reinicia as animações
     */
    restartAnimations() {
        try {
            const numbers = this.numbersList.querySelectorAll('.number-item');
            numbers.forEach((number, index) => {
                number.style.animation = 'none';
                setTimeout(() => {
                    number.style.animation = '';
                }, 10);
            });
            
            console.log('🔄 Animações reiniciadas com sucesso!');
        } catch (error) {
            console.error('❌ Erro ao reiniciar animações:', error);
        }
    }
}

// ========================================
// UTILITÁRIOS
// ========================================

/**
 * Utilitários para manipulação de cores
 */
const ColorUtils = {
    /**
     * Gera uma cor roxa aleatória
     */
    getRandomPurple() {
        const purples = ['#8B5CF6', '#A855F7', '#C084FC', '#E879F9', '#F0ABFC'];
        return purples[Math.floor(Math.random() * purples.length)];
    },

    /**
     * Aplica gradiente roxo a um elemento
     */
    applyPurpleGradient(element) {
        element.style.background = 'linear-gradient(45deg, #8B5CF6, #A855F7, #C084FC, #E879F9)';
    }
};

/**
 * Utilitários para animações
 */
const AnimationUtils = {
    /**
     * Aplica efeito de pulso
     */
    pulse(element, duration = 1000) {
        element.style.animation = `pulse ${duration}ms ease-in-out`;
        setTimeout(() => {
            element.style.animation = '';
        }, duration);
    },

    /**
     * Aplica efeito de shake
     */
    shake(element, duration = 500) {
        element.style.animation = `shake ${duration}ms ease-in-out`;
        setTimeout(() => {
            element.style.animation = '';
        }, duration);
    }
};

// ========================================
// INICIALIZAÇÃO
// ========================================

// Criar instância do site
const numbersSite = new NumbersSite();

// Inicializar quando o script for carregado
numbersSite.init();

// Expor para uso global (opcional)
window.NumbersSite = numbersSite;
window.ColorUtils = ColorUtils;
window.AnimationUtils = AnimationUtils;

// Event listeners globais
document.addEventListener('siteLoaded', (event) => {
    console.log('🎉 Site carregado:', event.detail);
});

document.addEventListener('numberClicked', (event) => {
    console.log('🟣 Número clicado:', event.detail);
});

// ========================================
// FUNÇÕES DE DESENVOLVIMENTO
// ========================================

/**
 * Função para debug (apenas em desenvolvimento)
 */
function debugSite() {
    if (window.NumbersSite) {
        console.log('🔍 Debug do site:', window.NumbersSite.getStats());
    }
}

/**
 * Função para testar efeitos
 */
function testEffects() {
    const numbers = document.querySelectorAll('.number-item');
    numbers.forEach((number, index) => {
        setTimeout(() => {
            AnimationUtils.pulse(number);
        }, index * 200);
    });
}

// Expor funções de debug (apenas em desenvolvimento)
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    window.debugSite = debugSite;
    window.testEffects = testEffects;
}

// ========================================
// EXPORTAÇÃO (para módulos)
// ========================================

// Verificar se está em ambiente de módulo
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        NumbersSite,
        ColorUtils,
        AnimationUtils,
        CONFIG
    };
} 