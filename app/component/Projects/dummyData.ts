export const dummyData = Array.from({ length: 2 }, (_, index) => ({
    _id: `67bc509530d32feb1e7805${index.toString(16).padStart(2, "0")}`, // Unique _id
    name: `Project ${index + 1}`,
    description: `<p>Description for project ${index + 1}</p>`,
    images: [
      `https://dl.dropboxusercontent.com/scl/fi/lwqg4ss4r3aymdmpmn6ko/project-${index + 1}.webp?rlkey=bi4n5vd89h47lxgc1j3omkxgr&dl=0`
    ],
    type: index % 2 === 0 ? "residential" : "commercial", // Alternating types
    specifications: [
      {
        name: `Specification ${index + 1}`,
        value: `Value ${index + 1}`,
        logo: `https://dl.dropboxusercontent.com/scl/fi/g1q1i8nfqyl7zx39fwusu/spec-logo-${index + 1}.svg?rlkey=de2hh7h516tgqwry124da6k9q&dl=0`,
        _id: `67bc509530d32feb1e7806${index.toString(16).padStart(2, "0")}`
      }
    ],
    createdAt: new Date(1740394645444 + index * 100000), // Slightly different timestamps
    __v: 0,
    location: index % 2 === 0 ? "India, Kerala" : "India, Mumbai" // Alternating locations
  }));
  