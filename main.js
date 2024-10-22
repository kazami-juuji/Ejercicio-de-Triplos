document.getElementById("convertir").addEventListener("click", () => {
    const expresion = document.getElementById("expresion").value.trim();
    const resultadoDiv = document.getElementById("resultado");

    if (!expresion) {
        resultadoDiv.innerText = "Por favor, ingresa una expresión válida.";
        return;
    }

    resultadoDiv.innerHTML = "";

    try {
        const resultadoFinal = evaluarExpresionInfijaPasoAPaso(expresion, resultadoDiv);
        resultadoDiv.innerHTML += `<p><strong>Resultado Final:</strong> ${resultadoFinal}</p>`;
    } catch (error) {
        resultadoDiv.innerText = "Error al evaluar la expresión.";
    }
});

const evaluarExpresionInfijaPasoAPaso = (expresion, resultadoDiv) => {
    while (/\([^\(\)]+\)/.test(expresion)) {
        expresion = expresion.replace(/\([^\(\)]+\)/, (subExp) => {
            const resultadoParcial = evaluarExpresion(subExp);
            
            resultadoDiv.innerHTML += `<p>Evaluando: ${subExp} = ${resultadoParcial}</p>`;
            
            const expresionSustituida = expresion.replace(subExp, resultadoParcial);
            resultadoDiv.innerHTML += `<p>Expresión actual: ${expresionSustituida}</p>`;

            return resultadoParcial;
        });
    }

    return evaluarExpresion(expresion);
};

const evaluarExpresion = (expresion) => {
    expresion = expresion.replace(/[()]/g, '');

    try {
        const resultado = new Function(`return ${expresion}`)();
        return resultado;
    } catch (error) {
        throw new Error("Expresión no válida");
    }
};