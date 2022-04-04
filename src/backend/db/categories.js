import { v4 as uuid } from "uuid";

/**
 * Category Database can be added here.
 * You can add category of your wish with different attributes
 * */

export const categories = [
  {
    _id: uuid(),
    categoryName: "Design",
    description:
      "Automotive design is the process of developing the appearance (and to some extent the ergonomics) of motor vehicles.The functional design and development of a modern motor vehicle is typically done by a large team from many different disciplines also included within automotive engineering.",
    image:
      "https://drive.google.com/uc?export=view&id=1MMgLYtudVFEydTmQJIaDyY0NqxrRoAjV",
  },
  {
    _id: uuid(),
    categoryName: "Safety",
    description:
      "Automotive safety is the study and practice of design, construction, equipment and regulation to minimize the occurrence and consequences of traffic collisions involving motor vehicles.",
    image:
      "https://drive.google.com/uc?export=view&id=1nrK9VGV5AQJAZCQe9GnAmPRbr9HiMlGE",
  },
  {
    _id: uuid(),
    categoryName: "Engine",
    description:
      "The engine of a car or other vehicle is the part that produces the power which makes the vehicle move.",
    image:
      "https://drive.google.com/uc?export=view&id=1QLNJx12jzH2Lt8h9qIGzTf2l5w79rPjH",
  },
];
