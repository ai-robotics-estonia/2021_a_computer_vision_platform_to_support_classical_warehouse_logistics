const defaultTransform = {
    startPosition: { x: 0, y: 0, z: 0 },
    offset: { x: 0, y: 0, z: 0 },
    scale: 1,
    angle: 0,
}

function doTransform(pc) {
    const { startPosition, offset: { x,y,z }, scale, angle } = pc._transform
    pc.scale.x = scale;
    pc.scale.y = scale;
    pc.scale.z = scale;

    pc.position.x = (startPosition.x + x) * scale;
    pc.position.y = (startPosition.y + y) * scale;
    pc.position.z = (startPosition.z + z) * scale;

    pc.rotation.z = angle;
}

export function transformPointCloud(pc, value) {
    const { offsetX, offsetY, angle, offsetZ, scale } = value;
    if (!pc._transform)
        pc._transform = { startPosition: {...pc.position} }
    pc._transform.scale = scale;
    pc._transform.offset = { x: offsetX, y: offsetY, z: offsetZ };
    pc._transform.angle = angle;
    doTransform(pc);
}

export function scalePointCloud(pc, scale) {
    if (!pc._transform)
        pc._transform = { startPosition: {...pc.position}, offset: {...defaultTransform.offset} }
    pc._transform.scale = scale;
    doTransform(pc);
}

export function movePointCloud(pc, offset) {
    if (!pc._transform)
        pc._transform = { startPosition: {...pc.position}, scale: defaultTransform.scale }
    pc._transform.offset = offset;
    doTransform(pc);
}

export function materialTraverse(object, materials = new Set()) {
    if (object.material) materials.add(object.material);
    for (const child of object.children) materialTraverse(child, materials)
    return materials;
}