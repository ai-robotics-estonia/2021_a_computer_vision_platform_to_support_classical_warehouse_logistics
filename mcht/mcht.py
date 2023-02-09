import io
import sys
import os
import time


def process(camera_frame_video_pairs):
    sys.stderr.write("DEBUG:" + str(camera_frame_video_pairs))
    sys.stderr.write(os.linesep)
    print("TIMESTAMP; OBJECT_ID; X; Y; Z; BBX1; BBY1; BBZ1; BBX2; BBY2; BBZ2", flush=True)
    side_length = 10
    obj_size = 0.5
    obj_half = obj_size / 2
    start_pos = int(side_length / 2)
    for i in range(side_length * 4):
        side = int(i / side_length)
        if side == 0:
            x = start_pos - i % side_length
            y = start_pos
        elif side == 1:
            x = -start_pos
            y = start_pos - i % side_length
        elif side == 2:
            x = -start_pos + i % side_length
            y = -start_pos
        elif side == 3:
            x = start_pos
            y = -start_pos + i % side_length
        print(
            f"{time.time()};1;{x};{y};{0.1};{x + obj_half};{y + obj_half};{0};{x - obj_half}; {y - obj_half};{obj_size}",
            flush=True)
        time.sleep(1)
        x, y = -y, -x
        print(
            f"{time.time()};2;{x};{y};{0.1};{x + obj_half};{y + obj_half};{0};{x - obj_half}; {y - obj_half};{obj_size}",
            flush=True)
        time.sleep(1)
    # print("0.0;1;1.0;2.0;3.0;0.0;1.0;0.0;2.0;3.0;1.0")
    # print("1.0;1;1.5;2.0;3.0;0.5;1.0;0.0;2.5;3.0;1.0")
    sys.exit(0)
