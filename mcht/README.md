# MCHT 

3D kitsenduste ja objektituvastajate koostöös toimiv 3D objektide jälgimine


# Käivitamine käsurealt:

Iga video kohta tuleb anda kolm parameetrit: 
1. Alguskaadri number
2. Video file asukoht
3. Videole vastava pildi nimi camera_params file-s

```bash
./run-mcht.py --camera_params ./data/camera-params-sample.csv \
    --video 100 /data/video1.mp4 image_1.jpg \
    --video 200 /data/video2.mp4 image_2.jpg \
    --video 300 /data/video3.mp4 image_3.jpg \
    --video 400 /data/video4.mp4 image_4.jpg
```