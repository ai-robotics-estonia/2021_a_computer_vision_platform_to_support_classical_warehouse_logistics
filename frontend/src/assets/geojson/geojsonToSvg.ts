const GeojsonToSvg = {
  convertToSvgSquare: function (json: any, size: number) {
    // size: width and height of resulting svg
    const geojson2svg = require('geojson2svg');
    const options = {
      // todo pick which attributes of the svg need to be saved
      // make these the same as svg-to-geojson attributes
      attributes: [
        'properties.stroke',
        'properties.stroke-width',
        'properties.stroke-opacity',
        'properties.fill',
        'properties.fill-opacity',
        'properties.id',
        'properties.class',
      ], // list of attributes that are saved
      viewportSize: { width: size, height: size }, // bounds that coordinates are converted to
      output: 'svg',
      mapExtent: { top: size, right: size, bottom: 0, left: 0 }, // bounds that coordinates are converted from
    };
    const converter = geojson2svg(options);
    let result = converter.convert(json, {});

    // join individual shapes into one svg
    // it may be reasonable to only return a list of objects
    const start = `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg"><g class="layer"><title>Layer 1</title>`;
    const end = '</g></svg>';
    result = start + result.join('') + end;
    //console.log(result);
    return result;
  },

  /**
   * Convert a given geojson object to svg.
   *
   * @param json object to be converted
   * @param width width of final svg element
   * @param height height of final svg element
   */
  convertToSvgAuto: function (json: any, width: number, height: number) {
    // feed json into square with bigger of width/height
    const size = Math.max(width, height);
    const svg = this.convertToSvgSquare(json, size);

    // put result into html
    let divElement = document.createElement('div');
    divElement.innerHTML = svg;

    // change width and height into correct numbers
    divElement.firstElementChild!.setAttribute('width', String(width));
    divElement.firstElementChild!.setAttribute('height', String(height));

    return divElement.innerHTML;
  },
};

export default GeojsonToSvg;
