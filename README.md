# A Computer Vision Platform to Support Classical Warehouse Logistics

## Summary
| Company Name | [Valdek AS](https://valdek.ee) |
| :--- | :--- |
| Development Team Lead Name | [Dr. Juhan-Peep Ernits](https://www.etis.ee/CV/Juhan-Peep_Ernits/eng/) |
| Development Team Lead E-mail | [juhan.ernits@taltech.ee](mailto:juhan.ernits@taltech.ee) |
| Objectives of the Demonstration Project | Develop a system that can track products stored on pallets with accuracy of 2-3 m. |
| Final Report | [Demoproject_report_1_Tehisintellektil_põhinev_laosüsteem.docx.pdf](https://github.com/ai-robotics-estonia/a_computer_vision_platform_to_support_classical_warehouse_logistics/files/13798011/Demoproject_report_1_Tehisintellektil_pohinev_laosusteem.docx.pdf); [Demonstration-Project_Report_#2.pdf](https://github.com/ai-robotics-estonia/a_computer_vision_platform_to_support_classical_warehouse_logistics/files/13798010/Demonstration-Project_Report_.2.pdf) |

Some of the details are filled in the [description](#description) directly; some details are omitted based on a a [custom agreement with the AIRE team](#custom-agreement-with-the-AIRE-team).

# Description
## Objectives of the Demonstration Project
*Please describe your project objectives in detail.*

Develop a system that can track products stored on pallets with accuracy of 2-3 m, recognize the products and associate them (with the help of processing consignment documents, robotic cell control information and human operator expertise) with actual labels with high accuracy. The system should make it straight forward to human operators to make corrections that would be taken into account in the further automated learning process.

## Activities and Results of the Demonstration Project
### Challenge
*Please describe challenge addressed (i.e, whether and how the initial challenge was changed during the project, for which investment the demonstration project was provided).*

The problems that we plan to solve in the test before invest experiment is to introduce automated tracking of the products on pallets. The impact is to reduce downtime of robotic cells and save the time of staff that is currently often wasted on searching for the partially finished products in the storage areas. Research into existing product tracking solutions yielded a result that if it would be possible to track the products in the stores using video feeds, then it would be most cost effective. The plan is to use existing security camera video feeds and in areas requiring better coverage add security cameras to provide visual tracking. 
The innovative gap lies in creating a system that is able to learn to recognize new products and track them. It should also be possible to track previously unknown products and assign labels to them retrospectively to produce a trail of product positions since arrival.

### Data Sources
*Please describe which data was used for the technological solution.*

All the data is gathered directly on warehouse floor at Valdek AS.

### Technical Architecture
*Please describe the technical architecture (e.g, presented graphically, where the technical solution integration with the existing system can also be seen).*

Find the Docker Compose [files](backend) which define the setup.

### Future Potential of the Technical Solution
*Please describe the potential areas for future use of the technical solution.*
- All SMEs that have products /components stored on pallets during their production process could benefit from the solution;
- AS Valdek: There has been general interest, but we will be able to name concrete candidates after demonstrating the actual results of the first and second phase to potential clients.

# Custom agreement with the AIRE team
Some of the details are omitted from this README as they are evident in Docker Compose files as described [above](#technical-architecture).
