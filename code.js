var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
figma.showUI(__html__, { width: 300, height: 300 });
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}
figma.ui.onmessage = (msg) => __awaiter(this, void 0, void 0, function* () {
    if (msg.type === 'BarChart') {
        yield figma.loadFontAsync({ family: 'Roboto', style: 'Regular' });
        let { countColumns, minValue, maxValue, columnWidth, chartCount } = msg;
        let chartWidth = columnWidth * countColumns + 50 * countColumns;
        const step = String(maxValue).length === 3 ? 20 : 100;
        columnWidth = columnWidth / chartCount;
        const minusMinValue = minValue < 0
            ? Number.isInteger(minValue / step)
                ? Math.abs(minValue)
                : step * Math.ceil(Math.abs(minValue) / step)
            : 0;
        const numberOfLabel = Math.ceil((maxValue + minusMinValue) / step);
        const randomMaxValue = maxValue;
        const randomMinValue = minValue;
        maxValue = Number.isInteger(maxValue / step) ? maxValue : step * Math.ceil(maxValue / step);
        const baseRect = figma.createRectangle();
        baseRect.resize(chartWidth, maxValue + minusMinValue);
        baseRect.y = -maxValue;
        baseRect.opacity = 0;
        baseRect.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 0.2 } }];
        const group = figma.group([baseRect], figma.currentPage);
        // Create Bar
        const iterateChart = new Array(chartCount);
        iterateChart.fill(1, 0, chartCount);
        iterateChart.forEach((_, index) => {
            let randomColors = { r: Math.random(), g: Math.random(), b: Math.random() };
            for (let i = 0; i < countColumns; i++) {
                let rect = figma.createRectangle();
                const rectHight = getRandomInt(randomMinValue, randomMaxValue);
                rect.strokeWeight = 1;
                rect.strokeCap;
                rect.resize(columnWidth, Math.abs(rectHight));
                const chartStrokeStyles = [
                    {
                        color: { r: 0, g: 0, b: 0.2 },
                        type: 'SOLID',
                        visible: true,
                        opacity: 0.7,
                        blendMode: 'NORMAL',
                    },
                ];
                rect.strokes = rect.strokes.concat(chartStrokeStyles);
                rect.fills = [{ type: 'SOLID', color: randomColors }];
                rect.x = i * (columnWidth * chartCount + 50) + (50 / 2 + columnWidth * index) + index / 2;
                Math.sign(rectHight) === -1 ? (rect.y = 0.5) : (rect.y = -rectHight);
                group.appendChild(rect);
            }
        });
        // Create Label X
        for (let i = 0; i < countColumns; i++) {
            const sectionWidth = chartWidth / countColumns;
            const labels = figma.createText();
            labels.characters = String(labels);
            labels.name = 'Label-X';
            labels.characters = 'TEXT';
            labels.fills = [{ type: 'SOLID', color: { r: 0.49, g: 0.49, b: 0.49 } }];
            labels.fontSize = 8;
            labels.resize(sectionWidth, 10);
            labels.textAlignHorizontal = 'CENTER';
            labels.y = minusMinValue + 5;
            labels.x = sectionWidth * i;
            group.appendChild(labels);
        }
        // Create Label Y and horizontal grid
        let label = 0;
        let horizontalGrids = 0;
        for (let i = 0; i <= numberOfLabel; i++) {
            // Create Label Y
            const labels = figma.createText();
            if (i === 0) {
                // Create Label Y
                label = -minusMinValue;
                // Create horizontal grid
                horizontalGrids = -maxValue;
            }
            else {
                label += step;
                // Create horizontal grid
                horizontalGrids += step;
            }
            // Create Label Y
            labels.characters = String(label);
            labels.name = 'Label-Y';
            labels.x = String(maxValue).length * -10;
            labels.y = Number(-label) - 4;
            labels.fills = [{ type: 'SOLID', color: { r: 0.49, g: 0.49, b: 0.49 } }];
            labels.fontSize = 8;
            labels.resize(20, 10);
            labels.textAlignHorizontal = 'RIGHT';
            group.appendChild(labels);
            // Create horizontal grid
            const horizontalGrid = figma.createRectangle();
            horizontalGrid.resizeWithoutConstraints(chartWidth + 3, 0.5);
            horizontalGrid.fills = [{ type: 'SOLID', color: { r: 0.49, g: 0.49, b: 0.49 } }];
            horizontalGrid.opacity = 0.3;
            horizontalGrid.y = horizontalGrids;
            horizontalGrid.x = -3;
            group.appendChild(horizontalGrid);
        }
        // Create vertical grid
        let verticalGrids = 0;
        for (let i = 0; i < countColumns + 1; i++) {
            const verticalGrid = figma.createRectangle();
            verticalGrid.name = 'verticalGrid';
            verticalGrid.fills = [{ type: 'SOLID', color: { r: 0.49, g: 0.49, b: 0.49 } }];
            verticalGrid.opacity = 0.3;
            verticalGrid.resizeWithoutConstraints(0.5, maxValue + minusMinValue);
            verticalGrid.y += -maxValue;
            if (i === 0) {
                verticalGrid.x = verticalGrids;
            }
            else {
                verticalGrids += columnWidth * chartCount + 50;
                verticalGrid.x = verticalGrids;
            }
            group.appendChild(verticalGrid);
        }
    }
    figma.closePlugin();
});
