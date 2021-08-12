figma.showUI(__html__, { width: 300, height: 300 });

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

figma.ui.onmessage = async (msg) => {
  if (msg.type === 'BarChart') {
    await figma.loadFontAsync({ family: 'Roboto', style: 'Regular' });

    let { countColumns, minValue, maxValue, columnWidth } = msg;
    let chartWidth = columnWidth * countColumns + 50 * countColumns;
    const step = String(maxValue).length === 3 ? 20 : 100;

    const minusMinValue =
      minValue < 0
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
    for (let i = 0; i < countColumns; i++) {
      let rect = figma.createRectangle();
      const rectHight = getRandomInt(randomMinValue, randomMaxValue);

      rect.resize(columnWidth, Math.abs(rectHight));
      rect.fills = [{ type: 'SOLID', color: { r: 1, g: 0.68, b: 0.75 } }];
      rect.x = i * (columnWidth + 50) + 50 / 2;

      Math.sign(rectHight) === -1 ? (rect.y = 1) : (rect.y = -rectHight);

      group.appendChild(rect);
    }

    let label = 0;
    let horizontalGrids = 0;

    // Create Label Y and horizontal grid
    for (let i = 0; i <= numberOfLabel; i++) {
      // Create Label Y
      const labels = figma.createText();
      if (i === 0) {
        // Create Label Y
        label = -minusMinValue;
        // Create horizontal grid
        horizontalGrids = -maxValue;
      } else {
        label += step;
        // Create horizontal grid
        horizontalGrids += step;
      }
      // Create Label Y
      labels.characters = String(label);
      labels.x = String(maxValue).length * -10;
      labels.y = Number(-label) - 4;
      labels.fills = [{ type: 'SOLID', color: { r: 0.49, g: 0.49, b: 0.49 } }];
      labels.fontSize = 8;
      labels.resize(20, 10);
      labels.textAlignHorizontal = 'RIGHT';
      group.appendChild(labels);

      // Create horizontal grid
      const horizontalGrid = figma.createRectangle();
      horizontalGrid.resize(chartWidth + 3, 1);
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
      verticalGrid.resize(1, maxValue + minusMinValue);
      verticalGrid.y += -maxValue;
      if (i === 0) {
        verticalGrid.x = verticalGrids;
      } else {
        verticalGrids += columnWidth + 50;
        verticalGrid.x = verticalGrids;
      }

      group.appendChild(verticalGrid);
    }
  }
};
