import trimesh
import numpy as np
from trimesh.transformations import rotation_matrix
from pathlib import Path

OUT = Path('/mnt/data/portfolio_github/assets/avatar.glb')
scene = trimesh.Scene()

# Palette from the portfolio, adapted to the avatar.
SKIN = [0.74, 0.48, 0.34, 1.0]
SKIN2 = [0.86, 0.62, 0.46, 1.0]
HAIR = [0.12, 0.075, 0.055, 1.0]
HAIR2 = [0.19, 0.12, 0.075, 1.0]
EYE = [0.42, 0.31, 0.16, 1.0]
WHITE = [0.93, 0.90, 0.82, 1.0]
BURGUNDY = [0.30, 0.10, 0.12, 1.0]
GOLD = [0.66, 0.48, 0.10, 1.0]
SHOE = [0.86, 0.84, 0.78, 1.0]


def mat(color, metallic=0.0, rough=0.65):
    return trimesh.visual.material.PBRMaterial(
        baseColorFactor=color,
        metallicFactor=metallic,
        roughnessFactor=rough,
    )


def add(mesh, name, color, material=None):
    mesh.visual.material = material or mat(color)
    scene.add_geometry(mesh, node_name=name)
    return mesh


def uv_sphere(name, loc, scale, color, sections=32, rings=20):
    m = trimesh.creation.uv_sphere(radius=1.0, count=[sections, rings])
    m.apply_scale(scale)
    m.apply_translation(loc)
    return add(m, name, color)


def capsule(name, loc, radius, height, color, axis='z'):
    # cylinder + spheres for a soft stylized capsule
    cyl = trimesh.creation.cylinder(radius=radius, height=max(0.01, height-2*radius), sections=32)
    cyl.apply_translation(loc)
    if axis == 'y':
        R = rotation_matrix(np.pi/2, [1,0,0]); cyl.apply_transform(R)
    elif axis == 'x':
        R = rotation_matrix(np.pi/2, [0,1,0]); cyl.apply_transform(R)
    add(cyl, name+'_body', color)
    if axis == 'z':
        ends=[(loc[0],loc[1],loc[2]-(height/2-radius)),(loc[0],loc[1],loc[2]+(height/2-radius))]
    elif axis == 'y':
        ends=[(loc[0],loc[1]-(height/2-radius),loc[2]),(loc[0],loc[1]+(height/2-radius),loc[2])]
    else:
        ends=[(loc[0]-(height/2-radius),loc[1],loc[2]),(loc[0]+(height/2-radius),loc[1],loc[2])]
    for i,p in enumerate(ends): uv_sphere(name+f'_cap{i}', p, (radius,radius,radius), color)

# Ground-free full body avatar, front-facing toward -Y.
# Feet / shoes
for x in (-0.28, 0.28):
    shoe = trimesh.creation.box(extents=(0.36,0.62,0.18))
    shoe.apply_translation((x,-0.02,0.12))
    add(shoe, f'shoe_{x}', SHOE)

# Legs: white trousers
for x in (-0.23,0.23):
    capsule(f'leg_{x}', (x,0,0.82), 0.16, 1.25, WHITE)

# Torso in burgundy top
uv_sphere('torso', (0,0,1.55), (0.53,0.31,0.68), BURGUNDY)

# Arms, slightly bent / relaxed
for side in (-1,1):
    sx=side
    upper = trimesh.creation.capsule(radius=0.12, height=0.62, count=[24,12]) if hasattr(trimesh.creation,'capsule') else None
    if upper is not None:
        upper.apply_translation((sx*0.48,-0.01,1.60))
        upper.apply_transform(rotation_matrix(side*0.22, [0,1,0]))
        add(upper, f'arm_{side}', SKIN2)
    else:
        capsule(f'arm_{side}', (sx*0.48,-0.01,1.60), 0.12, 0.62, SKIN2)
    uv_sphere(f'hand_{side}', (sx*0.57,-0.08,1.28), (0.13,0.12,0.15), SKIN2)

# Neck and head
capsule('neck',(0,0,2.08),0.14,0.30,SKIN2)
uv_sphere('head',(0,-0.01,2.42),(0.43,0.34,0.49),SKIN2)

# Ears
for side in (-1,1):
    uv_sphere(f'ear_{side}', (side*0.42,-0.01,2.42),(0.075,0.055,0.12),SKIN2)

# Eyes on front (-Y)
for side in (-1,1):
    uv_sphere(f'eye_white_{side}', (side*0.16,-0.337,2.50),(0.075,0.035,0.055),WHITE,24,16)
    uv_sphere(f'iris_{side}', (side*0.16,-0.365,2.50),(0.036,0.018,0.036),EYE,20,12)
    uv_sphere(f'pupil_{side}', (side*0.16,-0.378,2.50),(0.015,0.009,0.020),[0.03,0.02,0.015,1],16,10)

# Brows
for side in (-1,1):
    brow = trimesh.creation.box(extents=(0.14,0.028,0.025))
    brow.apply_translation((side*0.16,-0.345,2.60))
    brow.apply_transform(rotation_matrix(side*0.08,[0,1,0]))
    add(brow, f'brow_{side}', HAIR)

# Nose + lips
uv_sphere('nose',(0,-0.36,2.38),(0.065,0.07,0.12),SKIN2)
uv_sphere('lip_upper',(0,-0.356,2.27),(0.10,0.025,0.025),[0.62,0.25,0.25,1])
uv_sphere('lip_lower',(0,-0.36,2.25),(0.09,0.025,0.026),[0.68,0.30,0.30,1])

# Hair: large back mass + many soft curls around sides and top.
uv_sphere('hair_back',(0,0.08,2.47),(0.54,0.39,0.62),HAIR)
# top waves
for i,(x,z,sx,sz,rot) in enumerate([
    (-0.34,2.78,0.25,0.20,-0.35),(-0.18,2.88,0.28,0.20,-0.12),(0,2.92,0.30,0.20,0.0),(0.18,2.88,0.28,0.20,0.12),(0.34,2.78,0.25,0.20,0.35)]):
    h=uv_sphere(f'hair_top_{i}',(x,0.02,z),(sx,0.35,sz),HAIR2)
    h.apply_transform(rotation_matrix(rot,[0,1,0]))
# side curls
for side in (-1,1):
    for i in range(5):
        z=2.20+i*0.16
        x=side*(0.43+0.035*(i%2))
        uv_sphere(f'curl_{side}_{i}',(x,0.02,z),(0.15,0.20,0.20),HAIR2)

# Simple gold necklace with pendant
for i in range(28):
    a=np.pi + (2*np.pi)*i/27
    x=0.19*np.cos(a); z=2.02+0.10*np.sin(a)
    uv_sphere(f'necklace_{i}',(x,-0.29,z),(0.012,0.012,0.012),GOLD,12,8)
uv_sphere('pendant',(0,-0.31,1.94),(0.045,0.018,0.055),GOLD,16,10)

scene.metadata['name']='Antonietta stylized portfolio avatar'
scene.metadata['description']='Stylized 3D avatar inspired by the supplied reference photos: long wavy brown hair, hazel eyes, burgundy top, white trousers, gold necklace.'
scene.export(OUT, file_type='glb')
print(OUT, OUT.stat().st_size)
