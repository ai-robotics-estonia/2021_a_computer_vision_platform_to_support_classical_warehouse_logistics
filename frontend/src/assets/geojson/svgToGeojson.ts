const SvgToGeojson = {
  convertToGeoJsonSquare: function (svg: string, size: number) {
    // size: width and height that the svg will be mapped to
    // if unsure, pick the size of the svg itself

    const { svgtogeojson } = require('@bettercorp/svg-to-geojson');

    // it seems this function ignores lines
    // use only paths

    // if the svg is not a square, then one dimension ends up squished
    const arrayOfBounds = [
      [size, size],
      [0, 0],
    ]; // bounds that coordinates will be converted to

    let divElement = document.createElement('div'); // div element that the function needs
    divElement.innerHTML = svg;

    // todo pick which attributes of the svg need to be saved
    const attributes: string[] = [
      'stroke',
      'stroke-width',
      'stroke-opacity',
      'fill',
      'fill-opacity',
      'id',
      'class',
    ]; // list of attributes that are saved

    const result: { features: any } = svgtogeojson.svgToGeoJson(
      arrayOfBounds,
      divElement.firstElementChild,
      3,
      attributes
    );

    // if the path contains 'z', then the converter adds the first coords to the end to close the loop
    // but if you convert multiple times back and forth, then that coordinate keeps getting added
    result.features.forEach((feature: any) => {
      const coords = feature.geometry.coordinates[0];
      // remove last coords if they are the same as second-to-last coords
      if (
        Math.round(coords[coords.length - 1][0]) ==
          Math.round(coords[coords.length - 2][0]) &&
        Math.round(coords[coords.length - 1][1]) ==
          Math.round(coords[coords.length - 2][1])
      ) {
        coords.pop();
      }
    });
    return result;
  },

  /**
   * Convert a given string of svg to geojson.
   *
   * Note that any line elements will not be converted.
   * @param svg string to be converted
   */
  convertToGeoJsonAuto: function (svg: string) {
    // place svg in html
    let divElement = document.createElement('div');
    divElement.innerHTML = svg;

    // find height/width
    const width = parseInt(
      divElement.firstElementChild!.getAttribute('width')!
    ); // https://stackoverflow.com/questions/40349987/how-to-suppress-error-ts2533-object-is-possibly-null-or-undefined
    const height = parseInt(
      divElement.firstElementChild!.getAttribute('height')!
    );
    const size = Math.max(width, height);

    // adjust one to be bigger
    divElement.firstElementChild!.setAttribute('width', String(size));
    divElement.firstElementChild!.setAttribute('height', String(size));

    // return result of square conversion
    return this.convertToGeoJsonSquare(divElement.innerHTML, size);
  },
};

export default SvgToGeojson;
