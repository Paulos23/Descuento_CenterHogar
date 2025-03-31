document.addEventListener("DOMContentLoaded", function() {
    window.calcularDescuento = function() {
        let precioLista = parseFloat(document.getElementById('precioLista').value);
        let precioDescuento = parseFloat(document.getElementById('precioDescuento').value);
        
        if (isNaN(precioLista) || isNaN(precioDescuento) || precioLista <= 0 || precioDescuento <= 0) {
            document.getElementById('resultado').innerText = "Por favor, ingrese valores válidos.";
            return;
        }
        
        let porcentaje = ((precioLista - precioDescuento) / precioLista) * 100;
        document.getElementById('resultado').innerText = "Descuento necesario: " + porcentaje.toFixed(4);
    };
    window.copiarResultado = function() {
        let resultado = document.getElementById('resultado').innerText;
    
        if (resultado.includes(":")) {
            let numero = resultado.split(":")[1].trim(); // Obtiene solo el número
            navigator.clipboard.writeText(numero)
                .then(() => alert("Número copiado al portapapeles: " + numero))
                .catch(err => console.error("Error al copiar: ", err));
        } else {
            alert("No hay un resultado válido para copiar.");
        }
        
    };
    window.calcularPagoMixto = function() {
        // Obtener valores de entrada
        let precioLista = parseFloat(document.getElementById('precioLista').value);
        let contado = parseFloat(document.getElementById('contado').value);
        
        // Validaciones
        if (isNaN(precioLista)) {
            alert("Por favor ingrese un Precio de Lista válido");
            return;
        }
        
        if (isNaN(contado)) {
            alert("Por favor ingrese un Pago Contado válido");
            return;
        }
        
        if (contado >= precioLista) {
            alert("El pago contado no puede ser mayor o igual al precio de lista");
            return;
        }
        
        // Cálculos
        let totalContado = precioLista * 0.85; // Precio con 15% de descuento
        let restoContado = totalContado - contado;
        let restoLista = restoContado / 0.85; // Operación inversa
        let precioFinal = contado + restoLista;
        let descuento = ((precioLista - precioFinal) / precioLista) * 100;
        
        // Formatear resultados
        function formatearMoneda(valor) {
            return '$' + valor.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
        
        // Mostrar resultados
        document.getElementById('totalContado').textContent = formatearMoneda(totalContado);
        document.getElementById('restoContado').textContent = formatearMoneda(restoContado);
        document.getElementById('restoLista').textContent = formatearMoneda(restoLista);
        document.getElementById('descuento').textContent = descuento.toFixed(4) + '%';
        document.getElementById('precioFinal').textContent = formatearMoneda(precioFinal);
    };
    
    window.copiarResultados = function() {
        let textoDescuento = document.getElementById('descuento').textContent;
        // Extraer solo el número (elimina el % y cualquier espacio)
        let numeroDescuento = textoDescuento.replace('%', '').trim();
        
        navigator.clipboard.writeText(numeroDescuento)
            .then(() => alert("Descuento copiado al portapeles: " + numeroDescuento))
            .catch(err => console.error("Error al copiar: ", err));
    };
    window.calcularDesdeLista = function() {
        // Obtener valores de entrada
        let precioLista = parseFloat(document.getElementById('precioLista').value);
        let parteLista = parseFloat(document.getElementById('parteLista').value);
        
        // Validaciones
        if (isNaN(precioLista)) {
            alert("Por favor ingrese un Precio de Lista válido");
            return;
        }
        
        if (isNaN(parteLista)) {
            alert("Por favor ingrese una Parte a Lista válida");
            return;
        }
        
        if (parteLista >= precioLista) {
            alert("La parte a lista no puede ser mayor o igual al precio de lista");
            return;
        }
        
        // Cálculos
        let parteContado = (precioLista - parteLista) * 0.85; // Aplicamos 15% descuento al resto
        let precioFinal = parteLista + parteContado;
        let descuento = ((precioLista - precioFinal) / precioLista) * 100;
        
        // Formatear resultados
        function formatearMoneda(valor) {
            return '$' + valor.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
        
        // Mostrar resultados
        document.getElementById('totalContado').textContent = formatearMoneda(precioLista * 0.85);
        document.getElementById('parteContado').textContent = formatearMoneda(parteContado);
        document.getElementById('descuento').textContent = descuento.toFixed(4) + '%';
        document.getElementById('precioFinal').textContent = formatearMoneda(precioFinal);
    };
    
    window.copiarDescuento = function() {
        let textoDescuento = document.getElementById('descuento').textContent;
        let numeroDescuento = textoDescuento.replace('%', '').trim();
        
        navigator.clipboard.writeText(numeroDescuento)
            .then(() => alert("Descuento copiado: " + numeroDescuento))
            .catch(err => console.error("Error al copiar: ", err));
    };
});
