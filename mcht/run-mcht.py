#!/usr/bin/env python3

import argparse
import sys
import os
import subprocess
import csv
from dataclasses import dataclass

import mcht


@dataclass
class CameraParams:
        name: str
        qw: float
        qx: float
        qy: float
        qz: float
        tx: float
        ty: float
        tz: float
        width: int
        height: int
        model: str
        params: list


@dataclass
class SimpleRadialParams(CameraParams):

    @property
    def f(self):
        return self.params[0]

    @property
    def cx(self):
        return self.params[1]

    @property
    def cy(self):
        return self.params[2]

    @property
    def k(self):
        return self.params[3]


@dataclass
class VideoFeed:

    camera_params: CameraParams
    video_path: str
    start_frame: int


def parse_args():
    parser = argparse.ArgumentParser(description="A runner for MCHT.")
    parser.add_argument("--camera_params", help="CSV file with camera parameters")
    parser.add_argument("--camera_masks", help="File containing camera masks")
    parser.add_argument("--video", action="append", nargs="*",
                        help="Takes 3 arguments: first frame ID, video file path and corresponding image name in \
                         camera params file.")
    # parser.add_argument("video_file", nargs="+", help="Paths to video files in the same order as camera params.")
    args = parser.parse_args()
    return args


def process_camera_params(camera_params_file_name):
    cameras = []
    with open(camera_params_file_name, newline='') as csvfile:
        paramsreader = csv.DictReader(csvfile, delimiter=';', quotechar='|')
        for dict in paramsreader:
            dict["params"] = [dict.pop("PARAMS[]"), *dict.pop(None)]
            if dict["MODEL"] == "SIMPLE_RADIAL":
                model = SimpleRadialParams(**{k.lower(): v for k, v in dict.items()})
            cameras.append(model)
    return cameras


def main():
    sys.stderr.write("DEBUG: Starting the MCHT runner.")
    sys.stderr.write(os.linesep)
    inputs = parse_args()
    # print(inputs.camera_params)
    cameras = process_camera_params(inputs.camera_params)
    # sys.stderr.write("DEBUG:"+str(cameras))
    # sys.stderr.write(os.linesep)
    # video_files=inputs.video_file
    video_args = inputs.video
    videos = [VideoFeed(
        camera_params=next(camera for camera in cameras if camera.name == video[2]),
        video_path=video[1],
        start_frame=video[0]
    ) for video in video_args]
    mcht.process(videos)


if __name__ == '__main__':
    main()
