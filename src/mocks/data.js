// Static fake data for mocking the backend

export const user = {
  id: "j.doe@ghga.de",
  ext_id: "aacaffeecaffeecaffeecaffeecaffeecaffeeaad@lifescience-ri.eu",
  name: "John Doe",
  title: "Dr.",
  email: "j.jdoe@home.org",
};

export const accessRequests = [
  {
    id: "TEST00004000001",
    user_id: "j.doe@ghga.de",
    dataset_id: "TEST00003000001",
    full_user_name: "Dr. John Doe",
    email: "j.jdoe@home.org",
    request_text: "This is a test request for dataset TEST00003000001.",
    access_starts: "2023-05-11T15:00:00.000Z",
    access_ends: "2024-05-11T14:59:59.000Z",
    request_created: "2023-05-09T12:04:02.000Z",
    status: "pending",
    status_changed: null,
    changed_by: null,
  },

  {
    id: "TEST00005000001",
    user_id: "j.doe@ghga.de",
    dataset_id: "TEST00002000001",
    full_user_name: "Dr. John Doe",
    email: "j.jdoe@home.org",
    request_text: "This is a test request for dataset TEST00002000001.",
    access_starts: "2023-05-12T15:00:00.000Z",
    access_ends: "2024-05-12T14:59:59.000Z",
    request_created: "2023-05-11T12:04:02.000Z",
    status: "allowed",
    status_changed: "2023-05-19T12:04:03.000Z",
    changed_by: "j.doe@ghga.de",
  },

  {
    id: "TEST00006000001",
    user_id: "j.doe@ghga.de",
    dataset_id: "TEST00001000001",
    full_user_name: "Dr. John Doe",
    email: "j.jdoe@home.org",
    request_text: "This is a test request for dataset TEST00001000001.",
    access_starts: "2023-05-52T15:00:00.000Z",
    access_ends: "2024-05-52T14:59:59.000Z",
    request_created: "2023-05-18T12:04:03.000Z",
    status: "denied",
    status_changed: "2023-05-19T12:04:02.000Z",
    changed_by: "j.doe@ghga.de",
  },
];

export const datasets = [
  {
    id: "TEST00001000001",
    title: "Some dataset for testing",
    description:
      "This is just a dataset with five dummy files that can be used" +
      " for testing the work package functionality of the Data Portal." +
      " Note that the description can be longer than the title.",
    stage: "download",
  },
  {
    id: "TEST00002000001",
    title: "Another dataset for testing",
    description:
      "This is another a dataset with three dummy files" +
      " and a shorter description.",
    stage: "download",
  },
  {
    id: "TEST00003000001",
    title: "A third dataset for testing",
    description:
      "This is another a dataset that is awaiting upload." +
      " Note that currently uploading data is not yet supported in the portal",
    stage: "upload",
  },
];

export const workPackageToken = {
  id: "WPKG00000000001",
  token: "MTIzNDU2Nzg5MDEyMzQ1Njc4OTAxMjM0",
};

export const embeddedDataset = {
  id: "TEST0000000011010",
  accession: "GHGA:TEST588887987",
  ega_accession: "EGATEST6516132",
  type: ["Test Type"],
  title: "Test dataset for details",
  description:
    "Test dataset for Metadata Repository get dataset details call. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vel risus commodo viverra maecenas accumsan lacus vel. Sit amet risus nullam eget felis eget nunc lobortis mattis. Iaculis at erat pellentesque adipiscing commodo. Volutpat consequat mauris nunc congue. At lectus urna duis convallis convallis tellus id interdum velit. Gravida cum sociis natoque penatibus et. Mauris in aliquam sem fringilla ut morbi. Ultrices gravida dictum fusce ut. At consectetur lorem donec massa sapien faucibus et molestie.",
  creation_date: "2022-10-11T00:00:00.000Z",
  update_date: "2022-10-12T00:00:00.000Z",
  release_date: null,
  has_study: [
    {
      id: "TEST10550005133",
      accession: "TEST18666800",
      ega_accession: "EGATEST88464",
      type: "test_genomics",
      title: "Test Study",
      description:
        "Test study description. Pharetra convallis posuere morbi leo urna molestie. Ut faucibus pulvinar elementum integer. Nec nam aliquam sem et tortor. Pretium viverra suspendisse potenti nullam ac. Commodo sed egestas egestas fringilla. Tincidunt dui ut ornare lectus sit. Amet massa vitae tortor condimentum lacinia quis vel eros donec. Feugiat pretium nibh ipsum consequat. Pulvinar etiam non quam lacus suspendisse faucibus interdum. Aliquam sem et tortor consequat id.",
      has_project: {
        alias: "TEST555586568",
        title: "Test project",
        description:
          "Test project description. Pharetra vel turpis nunc eget lorem. Nisi scelerisque eu ultrices vitae auctor eu augue. At tempor commodo ullamcorper a lacus vestibulum. Varius vel pharetra vel turpis nunc eget lorem. Viverra nibh cras pulvinar mattis nunc sed blandit. Ultricies integer quis auctor elit sed vulputate mi sit amet. Et molestie ac feugiat sed lectus vestibulum mattis ullamcorper. Ultricies tristique nulla aliquet enim tortor at. Lorem ipsum dolor sit amet consectetur adipiscing elit ut. Tortor dignissim convallis aenean et tortor at risus viverra adipiscing. Aliquam malesuada bibendum arcu vitae elementum curabitur vitae nunc sed. Facilisis volutpat est velit egestas dui id ornare arcu odio. Morbi tristique senectus et netus. Et netus et malesuada fames. Vel elit scelerisque mauris pellentesque pulvinar pellentesque habitant morbi. Diam sit amet nisl suscipit adipiscing bibendum est ultricies integer. Tortor condimentum lacinia quis vel eros. Amet facilisis magna etiam tempor orci eu lobortis elementum.",
      },
      has_publication: [
        {
          alias: "doi: 10.1109/5.771073",
          abstract:
            "Test publication abstract. Varius duis at consectetur lorem donec massa sapien faucibus. Amet porttitor eget dolor morbi non arcu. Urna nec tincidunt praesent semper feugiat nibh sed pulvinar proin. Accumsan tortor posuere ac ut consequat semper viverra nam. Vestibulum lorem sed risus ultricies. Sed odio morbi quis commodo odio. Viverra tellus in hac habitasse. Vestibulum mattis ullamcorper velit sed ullamcorper morbi tincidunt. Egestas tellus rutrum tellus pellentesque eu tincidunt tortor. Faucibus purus in massa tempor nec feugiat nisl. Nibh cras pulvinar mattis nunc. In tellus integer feugiat scelerisque varius morbi enim nunc faucibus. Vestibulum mattis ullamcorper velit sed ullamcorper morbi tincidunt. Vitae et leo duis ut diam quam. Egestas fringilla phasellus faucibus scelerisque eleifend donec pretium vulputate. Cras pulvinar mattis nunc sed blandit libero volutpat sed cras. Id diam maecenas ultricies mi eget mauris. Pulvinar etiam non quam lacus suspendisse faucibus interdum posuere lorem. Consequat ac felis donec et.",
          title: "Test publication",
          author: null,
          journal: null,
          year: null,
        },
      ],
    },
  ],
  has_data_access_policy: {
    id: "TEST10550005133",
    has_data_access_committee: {
      id: "TEST00053158143",
      alias: "Test DAC",
      has_member: [{ email: "test[at]test[dot]de" }],
      main_contact: "test[at]test[dot]de",
    },
    policy_text: `Test policy text. Neque volutpat ac tincidunt vitae semper quis. Mi eget mauris pharetra et ultrices neque ornare. Consectetur purus ut faucibus pulvinar elementum. Tortor at risus viverra adipiscing. Aliquam eleifend mi in nulla. Orci ac auctor augue mauris augue neque gravida. Rutrum tellus pellentesque eu tincidunt tortor aliquam nulla. Turpis massa tincidunt dui ut ornare lectus sit amet. Laoreet suspendisse interdum consectetur libero id faucibus nisl tincidunt. Auctor eu augue ut lectus arcu bibendum. Aenean et tortor at risus.\n
      Diam phasellus vestibulum lorem sed risus ultricies tristique nulla aliquet. Tempor orci eu lobortis elementum nibh. Tincidunt praesent semper feugiat nibh sed pulvinar proin gravida. Sed nisi lacus sed viverra tellus. Orci dapibus ultrices in iaculis nunc sed augue. Gravida dictum fusce ut placerat orci nulla pellentesque dignissim enim. Facilisi cras fermentum odio eu. Est placerat in egestas erat. At ultrices mi tempus imperdiet nulla malesuada. Tincidunt arcu non sodales neque. Mi bibendum neque egestas congue quisque.\n    
      Pharetra vel turpis nunc eget lorem dolor sed. Commodo quis imperdiet massa tincidunt nunc pulvinar sapien et. Vel pretium lectus quam id leo. Ornare suspendisse sed nisi lacus sed viverra. Magna etiam tempor orci eu lobortis elementum. Aliquam nulla facilisi cras fermentum. Rutrum tellus pellentesque eu tincidunt tortor aliquam nulla facilisi cras. Nam at lectus urna duis. Nunc scelerisque viverra mauris in aliquam sem fringilla ut morbi. At elementum eu facilisis sed odio morbi quis commodo odio. Amet nisl purus in mollis nunc sed id. Tristique sollicitudin nibh sit amet. Arcu risus quis varius quam quisque id diam. Nisl tincidunt eget nullam non. Bibendum arcu vitae elementum curabitur vitae. Vitae aliquet nec ullamcorper sit amet risus nullam eget felis.\n
      Cum sociis natoque penatibus et magnis. Quam lacus suspendisse faucibus interdum. Lorem dolor sed viverra ipsum. Non pulvinar neque laoreet suspendisse interdum consectetur. Sit amet consectetur adipiscing elit ut aliquam. Mi ipsum faucibus vitae aliquet nec. Eget egestas purus viverra accumsan in nisl nisi scelerisque eu. Vel orci porta non pulvinar neque laoreet suspendisse interdum consectetur. Justo nec ultrices dui sapien eget mi proin sed. Lacus viverra vitae congue eu consequat. Purus viverra accumsan in nisl nisi scelerisque eu ultrices vitae. Pretium aenean pharetra magna ac placerat vestibulum lectus mauris. Consequat interdum varius sit amet mattis vulputate. Venenatis cras sed felis eget velit. Cursus metus aliquam eleifend mi in nulla posuere sollicitudin aliquam. Tristique senectus et netus et malesuada fames ac. Massa enim nec dui nunc mattis enim ut tellus elementum.`,
  },
  has_experiment: [
    {
      alias: "TEST656660",
      ega_accession: null,
      description:
        "Test Experiment 1. Sagittis purus sit amet volutpat. Tellus cras adipiscing enim eu turpis egestas pretium. Vitae suscipit tellus mauris a diam maecenas sed enim ut. Vulputate enim nulla aliquet porttitor lacus luctus. Egestas sed sed risus pretium quam vulputate dignissim. Netus et malesuada fames ac turpis egestas maecenas. Nisl condimentum id venenatis a condimentum vitae sapien. Commodo quis imperdiet massa tincidunt nunc pulvinar sapien et. Vitae sapien pellentesque habitant morbi tristique senectus. Leo vel fringilla est ullamcorper eget nulla. Tempus egestas sed sed risus.",
    },
  ],
  has_sample: [
    {
      alias: "TEST4846964651",
      ega_accession: null,
      description:
        "Test Sample 1. Vivamus arcu felis bibendum ut. Eget mi proin sed libero enim. Metus dictum at tempor commodo ullamcorper a lacus. Tincidunt tortor aliquam nulla facilisi cras. Nullam vehicula ipsum a arcu. Malesuada proin libero nunc consequat. Purus faucibus ornare suspendisse sed nisi lacus sed viverra tellus. Elementum eu facilisis sed odio morbi quis. Condimentum id venenatis a condimentum vitae sapien pellentesque habitant. Purus sit amet volutpat consequat mauris nunc. Ultricies mi quis hendrerit dolor magna eget est lorem. Fermentum leo vel orci porta non pulvinar. Integer malesuada nunc vel risus commodo viverra maecenas.",
      case_control_status: "Test control status",
      has_individual: {
        has_phenotypic_feature: [{ concept_name: "Test phenotypic feature" }],
      },
      has_anatomical_entity: [{ concept_name: "Test anatomical entity" }],
    },
  ],
  has_file: [
    {
      name: "Test file 1",
      format: "FASTQ",
      size: "586156",
      checksum: "15117b282328146ac6afebaa8acd80e7",
      checksum_type: "MD5",
    },
  ],
};

export const datasetSummary = {
  id: "TEST0000000011010",
  accession: "GHGA:TEST588887987",
  ega_accession: "EGATEST6516132",
  description:
    "Test dataset for Metadata Repository get dataset details call. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vel risus commodo viverra maecenas accumsan lacus vel. Sit amet risus nullam eget felis eget nunc lobortis mattis. Iaculis at erat pellentesque adipiscing commodo. Volutpat consequat mauris nunc congue. At lectus urna duis convallis convallis tellus id interdum velit. Gravida cum sociis natoque penatibus et. Mauris in aliquam sem fringilla ut morbi. Ultrices gravida dictum fusce ut. At consectetur lorem donec massa sapien faucibus et molestie.",
  type: ["Test Type"],
  title: "Test dataset for details",
  dac_email: "test[at]test[dot]de;",
  sample_summary: {
    count: 3,
    stats: {
      sex: { female: 1, male: 1, unkown: 1 },
      tissues: { metastasis: 1, tumor: 2 },
      phenotypes: { "Test Phenotype 1": 2, "Test Phenotype 2": 1 },
    },
  },
  study_summary: {
    count: 1,
    stats: {
      ega_accession: "EGATEST88464",
      accession: "TEST18666800",
      title: "Test Study",
    },
  },
  experiment_summary: {
    count: 14,
    stats: {
      protocol: {
        "Ilumina test": 10,
        "HiSeq test": 4,
      },
    },
  },
  file_summary: {
    count: 27,
    stats: {
      format: { fastq: 22, bam: 5 },
      size: 434543980,
    },
  },
};

export const metadataSummary = {
  file_summary: {
    count: 532,
    stats: {
      format: { fastq: 124, bam: 408 },
    },
  },
  individual_summary: {
    count: 5432,
    stats: {
      sex: { female: 1935, male: 2358, unknown: 1139 },
    },
  },
  protocol_summary: {
    count: 1400,
    stats: {
      protocol: {
        "Ilumina test": 700,
        "HiSeq test": 700,
      },
    },
  },
  dataset_summary: {
    count: 252,
    stats: {},
  },
};

export const singleSearchResults = {
  facets: [
    {
      key: "has_study.type",
      name: "Study Type",
      options: [
        { option: "Option 1", count: 62 },
        { option: "Option 2", count: 37 },
      ],
    },
    {
      key: "type",
      name: "Dataset Type",
      options: [
        { option: "Option 1", count: 12 },
        { option: "Option 2", count: 87 },
      ],
    },
  ],
  count: 15,
  hits: [
    {
      document_type: "Dataset",
      id: "TEST0000000011010",
      content: {
        accession: "GHGA:TEST588887987",
        ega_accession: "EGATEST6516132",
        title: "Test dataset for details",
        description:
          "Test dataset for Metadata Repository get dataset details call. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vel risus commodo viverra maecenas accumsan lacus vel. Sit amet risus nullam eget felis eget nunc lobortis mattis. Iaculis at erat pellentesque adipiscing commodo. Volutpat consequat mauris nunc congue. At lectus urna duis convallis convallis tellus id interdum velit. Gravida cum sociis natoque penatibus et. Mauris in aliquam sem fringilla ut morbi. Ultrices gravida dictum fusce ut. At consectetur lorem donec massa sapien faucibus et molestie.",
        type: ["Test dataset type"],
      },
    },
  ],
};

export const searchResults = {
  facets: [
    {
      key: "has_study.type",
      name: "Study Type",
      options: [
        { option: "Option 1", count: 62 },
        { option: "Option 2", count: 37 },
      ],
    },
    {
      key: "type",
      name: "Dataset Type",
      options: [
        { option: "Test dataset type 1", count: 12 },
        { option: "Test dataset type 2", count: 87 },
      ],
    },
  ],
  count: 25,
  hits: [
    {
      document_type: "Dataset",
      id: "TEST0000000011010",
      content: {
        accession: "GHGA:TEST588887987",
        ega_accession: "EGATEST6516132",
        title: "Test dataset for details",
        description:
          "Test dataset for Metadata Repository get dataset details call. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vel risus commodo viverra maecenas accumsan lacus vel. Sit amet risus nullam eget felis eget nunc lobortis mattis. Iaculis at erat pellentesque adipiscing commodo. Volutpat consequat mauris nunc congue. At lectus urna duis convallis convallis tellus id interdum velit. Gravida cum sociis natoque penatibus et. Mauris in aliquam sem fringilla ut morbi. Ultrices gravida dictum fusce ut. At consectetur lorem donec massa sapien faucibus et molestie.",
        type: ["Test dataset type 1"],
      },
    },
    {
      document_type: "Dataset",
      id: "TEST0000000011010",
      content: {
        accession: "GHGA:TEST55668843",
        ega_accession: null,
        title: "Null EGA Accession test dataset for details 2",
        description:
          "Test dataset for Metadata Repository get dataset details call. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vel risus commodo viverra maecenas accumsan lacus vel. Sit amet risus nullam eget felis eget nunc lobortis mattis. Iaculis at erat pellentesque adipiscing commodo. Volutpat consequat mauris nunc congue. At lectus urna duis convallis convallis tellus id interdum velit. Gravida cum sociis natoque penatibus et. Mauris in aliquam sem fringilla ut morbi. Ultrices gravida dictum fusce ut. At consectetur lorem donec massa sapien faucibus et molestie.",
        type: ["Test dataset type 2"],
      },
    },
    {
      document_type: "Dataset",
      id: "TEST0000000011010",
      content: {
        accession: "GHGA:TEST5566545513",
        ega_accession: "EGATEST6519833",
        title: "Multiple dataset type test dataset for details",
        description:
          "Test dataset for Metadata Repository get dataset details call. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vel risus commodo viverra maecenas accumsan lacus vel. Sit amet risus nullam eget felis eget nunc lobortis mattis. Iaculis at erat pellentesque adipiscing commodo. Volutpat consequat mauris nunc congue. At lectus urna duis convallis convallis tellus id interdum velit. Gravida cum sociis natoque penatibus et. Mauris in aliquam sem fringilla ut morbi. Ultrices gravida dictum fusce ut. At consectetur lorem donec massa sapien faucibus et molestie.",
        type: ["Test dataset type 2", "Test dataset type 1"],
      },
    },
    {
      document_type: "Dataset",
      id: "TEST0000000011010",
      content: {
        accession: "GHGA:TEST556651512",
        ega_accession: "EGATEST6455135",
        title: "Null dataset type test dataset for details 4",
        description:
          "Test dataset for Metadata Repository get dataset details call. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vel risus commodo viverra maecenas accumsan lacus vel. Sit amet risus nullam eget felis eget nunc lobortis mattis. Iaculis at erat pellentesque adipiscing commodo. Volutpat consequat mauris nunc congue. At lectus urna duis convallis convallis tellus id interdum velit. Gravida cum sociis natoque penatibus et. Mauris in aliquam sem fringilla ut morbi. Ultrices gravida dictum fusce ut. At consectetur lorem donec massa sapien faucibus et molestie.",
        type: null,
      },
    },
    {
      document_type: "Dataset",
      id: "TEST0000000011010",
      content: {
        accession: "GHGA:TEST3545553544",
        ega_accession: "EGATEST354354354",
        title: "Long description test dataset for details 5",
        description:
          "Test dataset for Metadata Repository get dataset details call. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vel risus commodo viverra maecenas accumsan lacus vel. Sit amet risus nullam eget felis eget nunc lobortis mattis. Iaculis at erat pellentesque adipiscing commodo. Volutpat consequat mauris nunc congue. At lectus urna duis convallis convallis tellus id interdum velit. Gravida cum sociis natoque penatibus et. Mauris in aliquam sem fringilla ut morbi. Ultrices gravida dictum fusce ut. At consectetur lorem donec massa sapien faucibus et molestie. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nascetur ridiculus mus mauris vitae ultricies leo integer. Commodo quis imperdiet massa tincidunt nunc. Sed blandit libero volutpat sed cras ornare arcu. Et malesuada fames ac turpis egestas integer eget. Ultrices vitae auctor eu augue ut. Quis enim lobortis scelerisque fermentum dui. Amet tellus cras adipiscing enim eu turpis. Quis auctor elit sed vulputate mi sit amet mauris. Viverra tellus in hac habitasse platea dictumst vestibulum rhoncus est. Tellus at urna condimentum mattis pellentesque id. Orci nulla pellentesque dignissim enim sit amet venenatis. Purus viverra accumsan in nisl. Sapien faucibus et molestie ac feugiat. Urna nunc id cursus metus. Lectus mauris ultrices eros in cursus turpis massa tincidunt. Porttitor eget dolor morbi non arcu risus. Velit euismod in pellentesque massa placerat duis. Gravida cum sociis natoque penatibus et. Adipiscing tristique risus nec feugiat in fermentum posuere urna. Sit amet tellus cras adipiscing enim eu turpis. Amet mattis vulputate enim nulla aliquet porttitor lacus luctus accumsan. Ornare quam viverra orci sagittis eu volutpat odio. Morbi enim nunc faucibus a pellentesque sit. Aliquet nibh praesent tristique magna sit amet purus gravida quis. Ultricies lacus sed turpis tincidunt id aliquet. Laoreet sit amet cursus sit. Neque volutpat ac tincidunt vitae semper quis lectus nulla. Aliquam eleifend mi in nulla posuere sollicitudin. Vivamus arcu felis bibendum ut tristique et egestas quis ipsum. Sit amet facilisis magna etiam. Dolor sit amet consectetur adipiscing elit ut. Leo integer malesuada nunc vel risus commodo viverra. Aenean pharetra magna ac placerat vestibulum. Vitae congue eu consequat ac felis donec. Habitasse platea dictumst vestibulum rhoncus est pellentesque elit. A diam maecenas sed enim ut sem viverra. Lorem donec massa sapien faucibus et molestie ac. Ante in nibh mauris cursus mattis. Aliquam ultrices sagittis orci a scelerisque purus semper. Aliquam sem et tortor consequat id. Sed cras ornare arcu dui vivamus arcu felis bibendum ut. Nunc sed velit dignissim sodales ut eu sem. Non pulvinar neque laoreet suspendisse interdum consectetur libero id faucibus. Diam ut venenatis tellus in metus vulputate eu scelerisque. Quis blandit turpis cursus in. Sagittis nisl rhoncus mattis rhoncus urna neque viverra justo nec. Euismod nisi porta lorem mollis aliquam ut porttitor leo. Natoque penatibus et magnis dis parturient montes nascetur. Aliquam nulla facilisi cras fermentum odio eu feugiat pretium. Arcu bibendum at varius vel pharetra vel turpis nunc eget. Nisi scelerisque eu ultrices vitae auctor eu augue ut lectus. Volutpat commodo sed egestas egestas fringilla. Posuere urna nec tincidunt praesent semper feugiat nibh sed pulvinar. Elit sed vulputate mi sit amet. Velit euismod in pellentesque massa. Convallis tellus id interdum velit laoreet id. Varius duis at consectetur lorem. Pulvinar proin gravida hendrerit lectus. Mauris pellentesque pulvinar pellentesque habitant morbi tristique senectus. Pellentesque dignissim enim sit amet venenatis urna cursus eget. Mauris sit amet massa vitae tortor condimentum. In vitae turpis massa sed. At urna condimentum mattis pellentesque id nibh tortor id aliquet. Risus commodo viverra maecenas accumsan lacus vel facilisis volutpat est. At varius vel pharetra vel turpis nunc. Non diam phasellus vestibulum lorem sed risus ultricies tristique. Egestas pretium aenean pharetra magna ac placerat vestibulum lectus. Pulvinar elementum integer enim neque volutpat ac tincidunt vitae semper. Varius sit amet mattis vulputate enim nulla aliquet. Etiam non quam lacus suspendisse faucibus interdum posuere. Posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Nisl rhoncus mattis rhoncus urna neque viverra justo. Aliquam ut porttitor leo a diam sollicitudin tempor id. Aliquam ut porttitor leo a diam sollicitudin. Mi tempus imperdiet nulla malesuada pellentesque. Egestas sed sed risus pretium quam vulputate dignissim. In nibh mauris cursus mattis molestie a. Fames ac turpis egestas sed tempus urna et pharetra pharetra. A iaculis at erat pellentesque adipiscing commodo elit. A diam sollicitudin tempor id eu nisl nunc mi. Risus nullam eget felis eget nunc lobortis mattis. Posuere morbi leo urna molestie at. Ac turpis egestas integer eget aliquet nibh praesent. Faucibus turpis in eu mi bibendum neque egestas congue. Dui vivamus arcu felis bibendum ut tristique. Velit dignissim sodales ut eu sem integer vitae justo eget. Non sodales neque sodales ut etiam sit amet nisl. Sed viverra ipsum nunc aliquet bibendum enim facilisis gravida neque. Eleifend mi in nulla posuere sollicitudin aliquam ultrices sagittis orci. Proin fermentum leo vel orci porta non pulvinar neque laoreet. Habitasse platea dictumst quisque sagittis purus sit. Condimentum mattis pellentesque id nibh tortor id aliquet lectus proin. Quis commodo odio aenean sed. Senectus et netus et malesuada. Eget lorem dolor sed viverra ipsum nunc. Integer quis auctor elit sed vulputate mi sit. Vel elit scelerisque mauris pellentesque pulvinar pellentesque habitant morbi. Et ultrices neque ornare aenean euismod. Nulla facilisi nullam vehicula ipsum a arcu. Lectus vestibulum mattis ullamcorper velit sed ullamcorper morbi. Tortor dignissim convallis aenean et tortor at risus viverra. At erat pellentesque adipiscing commodo elit at imperdiet dui accumsan. Pellentesque habitant morbi tristique senectus et. Et malesuada fames ac turpis. Urna condimentum mattis pellentesque id nibh tortor id aliquet. Donec enim diam vulputate ut pharetra sit amet aliquam id. Feugiat sed lectus vestibulum mattis. Tincidunt eget nullam non nisi est sit amet. Consectetur adipiscing elit ut aliquam purus sit amet. Dui faucibus in ornare quam viverra orci sagittis eu. Enim sed faucibus turpis in eu. Integer enim neque volutpat ac. Nulla porttitor massa id neque. In pellentesque massa placerat duis ultricies lacus sed turpis. Sagittis id consectetur purus ut. Sit amet risus nullam eget felis eget nunc lobortis mattis. Semper quis lectus nulla at. Nisl purus in mollis nunc sed id. Sed cras ornare arcu dui vivamus arcu felis bibendum ut. Vulputate enim nulla aliquet porttitor lacus. Odio facilisis mauris sit amet massa vitae tortor condimentum. In nisl nisi scelerisque eu ultrices vitae auctor eu augue. Tellus mauris a diam maecenas sed enim. Imperdiet massa tincidunt nunc pulvinar sapien et ligula ullamcorper. Congue nisi vitae suscipit tellus mauris a. Vitae tempus quam pellentesque nec nam aliquam. Facilisi morbi tempus iaculis urna id volutpat lacus. Mauris ultrices eros in cursus turpis massa tincidunt dui. Augue eget arcu dictum varius duis. Odio pellentesque diam volutpat commodo sed egestas. Imperdiet proin fermentum leo vel orci porta non. Et odio pellentesque diam volutpat commodo sed egestas egestas fringilla. Suscipit tellus mauris a diam maecenas sed. Integer vitae justo eget magna. Tellus orci ac auctor augue mauris augue neque gravida in. Pellentesque diam volutpat commodo sed egestas. Leo vel fringilla est ullamcorper. Quis eleifend quam adipiscing vitae proin sagittis nisl rhoncus. Aliquam eleifend mi in nulla posuere sollicitudin aliquam ultrices. Varius morbi enim nunc faucibus a pellentesque sit. Lectus arcu bibendum at varius vel pharetra vel turpis nunc. Molestie a iaculis at erat pellentesque adipiscing commodo elit at. Nunc pulvinar sapien et ligula ullamcorper. At augue eget arcu dictum varius duis at consectetur. Parturient montes nascetur ridiculus mus mauris vitae ultricies. Erat nam at lectus urna duis convallis convallis. Nunc sed id semper risus. Neque volutpat ac tincidunt vitae semper quis lectus nulla. Cursus eget nunc scelerisque viverra mauris in aliquam sem. Aenean pharetra magna ac placerat vestibulum lectus. Orci a scelerisque purus semper eget duis. In iaculis nunc sed augue lacus viverra. Purus ut faucibus pulvinar elementum integer. Non quam lacus suspendisse faucibus interdum posuere lorem. Nunc sed velit dignissim sodales ut eu sem. Vitae proin sagittis nisl rhoncus mattis rhoncus. Risus commodo viverra maecenas accumsan lacus. Nisl nunc mi ipsum faucibus vitae aliquet nec. Tincidunt tortor aliquam nulla facilisi cras fermentum. Elit ut aliquam purus sit amet luctus venenatis lectus magna. Est placerat in egestas erat imperdiet sed. Morbi quis commodo odio aenean. Enim ut tellus elementum sagittis vitae. Sagittis id consectetur purus ut faucibus. Id semper risus in hendrerit. A diam sollicitudin tempor id eu nisl nunc mi. Nunc pulvinar sapien et ligula. Aliquam ut porttitor leo a diam sollicitudin. Congue quisque egestas diam in arcu cursus euismod. Porttitor lacus luctus accumsan tortor posuere ac ut consequat. Odio aenean sed adipiscing diam donec. Nullam vehicula ipsum a arcu. Arcu odio ut sem nulla pharetra diam sit amet nisl. Vivamus arcu felis bibendum ut tristique et egestas quis. Proin nibh nisl condimentum id venenatis a condimentum vitae. Orci sagittis eu volutpat odio facilisis mauris sit amet. Ullamcorper eget nulla facilisi etiam. Mauris rhoncus aenean vel elit scelerisque mauris pellentesque. Facilisis volutpat est velit egestas dui id ornare arcu odio. Ridiculus mus mauris vitae ultricies leo. Nisl pretium fusce id velit ut. Fames ac turpis egestas sed tempus. Pharetra diam sit amet nisl suscipit adipiscing bibendum. Vel facilisis volutpat est velit. Nisl rhoncus mattis rhoncus urna neque viverra. Laoreet non curabitur gravida arcu. Fermentum et sollicitudin ac orci phasellus. Feugiat in ante metus dictum at tempor commodo. Pellentesque pulvinar pellentesque habitant morbi tristique senectus. Eu sem integer vitae justo eget magna fermentum. Et egestas quis ipsum suspendisse ultrices gravida dictum fusce. Dignissim suspendisse in est ante in nibh mauris cursus mattis. Ut eu sem integer vitae justo. Libero volutpat sed cras ornare. Pretium vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae. Ullamcorper malesuada proin libero nunc consequat interdum. Maecenas pharetra convallis posuere morbi leo urna molestie at. At quis risus sed vulputate odio ut enim. Dui faucibus in ornare quam viverra orci. Amet volutpat consequat mauris nunc congue. Facilisi etiam dignissim diam quis enim lobortis scelerisque fermentum dui. Eu augue ut lectus arcu bibendum at varius. Amet dictum sit amet justo. Magna sit amet purus gravida quis blandit turpis cursus. Commodo odio aenean sed adipiscing diam. Nec feugiat in fermentum posuere urna nec tincidunt praesent. Pellentesque elit ullamcorper dignissim cras. Id interdum velit laoreet id donec ultrices. Morbi leo urna molestie at elementum eu. Imperdiet sed euismod nisi porta lorem mollis. Aliquet lectus proin nibh nisl. Commodo odio aenean sed adipiscing. Aenean vel elit scelerisque mauris pellentesque pulvinar pellentesque. Tortor posuere ac ut consequat semper. Congue eu consequat ac felis donec et odio pellentesque. Ut tristique et egestas quis ipsum suspendisse ultrices. Eu tincidunt tortor aliquam nulla facilisi cras fermentum odio eu. Donec ac odio tempor orci dapibus. Rhoncus est pellentesque elit ullamcorper dignissim cras tincidunt lobortis. Porta lorem mollis aliquam ut porttitor leo a diam. Viverra suspendisse potenti nullam ac tortor vitae. Arcu non sodales neque sodales ut etiam sit amet nisl. Ornare arcu odio ut sem nulla pharetra diam. Vestibulum mattis ullamcorper velit sed ullamcorper morbi tincidunt. Placerat vestibulum lectus mauris ultrices eros in cursus turpis massa. Ipsum dolor sit amet consectetur adipiscing elit duis. Neque convallis a cras semper auctor neque vitae tempus quam. Nullam vehicula ipsum a arcu cursus. Eget gravida cum sociis natoque penatibus et magnis dis parturient. Consequat nisl vel pretium lectus quam id leo in vitae. Proin nibh nisl condimentum id venenatis. Risus commodo viverra maecenas accumsan. Mauris cursus mattis molestie a iaculis at erat. Non sodales neque sodales ut. Tristique senectus et netus et malesuada fames. Egestas integer eget aliquet nibh praesent tristique magna sit amet. Eu ultrices vitae auctor eu augue ut lectus. Vestibulum lectus mauris ultrices eros in cursus turpis massa tincidunt. Libero volutpat sed cras ornare arcu dui. Maecenas ultricies mi eget mauris. Sit amet aliquam id diam maecenas ultricies mi eget. Mi eget mauris pharetra et ultrices neque. Non diam phasellus vestibulum lorem sed risus ultricies tristique nulla. Blandit massa enim nec dui nunc mattis enim ut. At risus viverra adipiscing at in. Nec sagittis aliquam malesuada bibendum. Morbi tristique senectus et netus et. Quisque id diam vel quam elementum pulvinar etiam non. Nunc sed augue lacus viverra vitae congue. Dictumst vestibulum rhoncus est pellentesque. Ipsum faucibus vitae aliquet nec ullamcorper sit amet. Malesuada pellentesque elit eget gravida cum sociis. Condimentum lacinia quis vel eros donec. In tellus integer feugiat scelerisque varius morbi enim nunc faucibus. Dolor magna eget est lorem ipsum dolor sit. Quis imperdiet massa tincidunt nunc. Orci a scelerisque purus semper eget duis at tellus at. Pellentesque sit amet porttitor eget. Vulputate eu scelerisque felis imperdiet. Feugiat in fermentum posuere urna nec tincidunt praesent semper feugiat. Urna et pharetra pharetra massa massa. Sit amet aliquam id diam maecenas ultricies. Non enim praesent elementum facilisis leo vel fringilla est. Tristique senectus et netus et malesuada fames ac turpis. Vel risus commodo viverra maecenas accumsan lacus. Condimentum id venenatis a condimentum vitae sapien pellentesque habitant morbi. Fusce id velit ut tortor pretium. Ultrices neque ornare aenean euismod. Aliquet nec ullamcorper sit amet risus nullam eget felis. Nulla facilisi cras fermentum odio eu feugiat. Blandit aliquam etiam erat velit scelerisque in. Duis at tellus at urna condimentum mattis. Quam lacus suspendisse faucibus interdum posuere lorem ipsum dolor. Ut pharetra sit amet aliquam id diam maecenas. Commodo quis imperdiet massa tincidunt nunc. Nascetur ridiculus mus mauris vitae. Parturient montes nascetur ridiculus mus mauris. Ullamcorper a lacus vestibulum sed arcu non. Consequat nisl vel pretium lectus quam id leo in vitae. Tellus mauris a diam maecenas sed enim ut. Pellentesque diam volutpat commodo sed egestas egestas fringilla phasellus. Augue mauris augue neque gravida in fermentum et sollicitudin. Elementum eu facilisis sed odio morbi quis commodo. Ut faucibus pulvinar elementum integer enim neque volutpat. Dolor sed viverra ipsum nunc aliquet bibendum. Risus commodo viverra maecenas accumsan lacus vel facilisis volutpat. Sit amet nisl suscipit adipiscing bibendum est ultricies integer quis. Ultricies lacus sed turpis tincidunt id aliquet risus feugiat. Ipsum dolor sit amet consectetur. Tincidunt nunc pulvinar sapien et ligula. Ut tellus elementum sagittis vitae et leo duis. Elit eget gravida cum sociis. Nibh ipsum consequat nisl vel pretium lectus quam id leo. Vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae elementum. Ac turpis egestas maecenas pharetra convallis posuere morbi leo urna. Pharetra pharetra massa massa ultricies mi quis hendrerit dolor. Sem viverra aliquet eget sit. Maecenas sed enim ut sem viverra aliquet. Semper risus in hendrerit gravida. Metus aliquam eleifend mi in nulla posuere sollicitudin. Integer malesuada nunc vel risus commodo viverra maecenas accumsan lacus. Egestas erat imperdiet sed euismod nisi porta lorem mollis aliquam. Ut placerat orci nulla pellentesque dignissim enim sit amet. Dui vivamus arcu felis bibendum ut tristique. Sit amet commodo nulla facilisi nullam vehicula ipsum. Venenatis a condimentum vitae sapien pellentesque. Aenean pharetra magna ac placerat vestibulum lectus mauris. Iaculis nunc sed augue lacus. Pretium vulputate sapien nec sagittis. Libero id faucibus nisl tincidunt eget nullam non. Suspendisse faucibus interdum posuere lorem ipsum dolor. Mauris nunc congue nisi vitae suscipit tellus mauris a diam. Ultricies mi eget mauris pharetra et ultrices neque. Lobortis elementum nibh tellus molestie nunc non blandit. Venenatis tellus in metus vulputate eu scelerisque felis. Nibh tellus molestie nunc non blandit massa enim nec dui. Ultrices mi tempus imperdiet nulla malesuada pellentesque elit eget. Pulvinar elementum integer enim neque volutpat. Facilisis volutpat est velit egestas dui id ornare arcu. Urna nunc id cursus metus aliquam eleifend mi in nulla. Et malesuada fames ac turpis egestas integer eget. Fames ac turpis egestas sed. Volutpat odio facilisis mauris sit amet. Ornare aenean euismod elementum nisi quis eleifend quam adipiscing. Aliquet nibh praesent tristique magna sit amet purus gravida quis. Quisque non tellus orci ac. Mauris augue neque gravida in fermentum et. Dui nunc mattis enim ut tellus elementum sagittis vitae et. Mauris cursus mattis molestie a iaculis at erat pellentesque. Dolor morbi non arcu risus quis varius quam quisque. Cursus sit amet dictum sit amet. Consectetur a erat nam at lectus urna. Scelerisque in dictum non consectetur a erat. Morbi non arcu risus quis varius quam. Massa tincidunt nunc pulvinar sapien et ligula. Sit amet risus nullam eget. Mattis nunc sed blandit libero volutpat. Risus feugiat in ante metus dictum at tempor. Lectus quam id leo in vitae turpis massa. Vel pharetra vel turpis nunc eget. Aliquam ut porttitor leo a diam sollicitudin tempor. Congue eu consequat ac felis donec et odio pellentesque diam. Fusce ut placerat orci nulla pellentesque dignissim. Non blandit massa enim nec dui nunc. Leo duis ut diam quam nulla. Et egestas quis ipsum suspendisse ultrices gravida dictum fusce. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper dignissim cras. Ac turpis egestas sed tempus urna et pharetra. Magna fermentum iaculis eu non diam phasellus vestibulum. Rhoncus dolor purus non enim praesent elementum facilisis leo. Tristique senectus et netus et malesuada fames ac. Viverra ipsum nunc aliquet bibendum enim facilisis. Dui sapien eget mi proin sed libero enim sed. Netus et malesuada fames ac turpis egestas integer. Tristique sollicitudin nibh sit amet commodo nulla facilisi. Ultrices neque ornare aenean euismod elementum. Cras pulvinar mattis nunc sed blandit. Volutpat commodo sed egestas egestas. Condimentum lacinia quis vel eros donec ac odio tempor orci. Varius vel pharetra vel turpis. Consequat semper viverra nam libero justo laoreet sit. Aliquet lectus proin nibh nisl condimentum id venenatis. In metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Sodales neque sodales ut etiam sit. Eleifend donec pretium vulputate sapien nec. Montes nascetur ridiculus mus mauris vitae ultricies leo integer malesuada. Pellentesque nec nam aliquam sem et tortor. Dignissim cras tincidunt lobortis feugiat vivamus at augue eget. Diam volutpat commodo sed egestas. Id nibh tortor id aliquet lectus proin nibh nisl. Felis imperdiet proin fermentum leo vel orci porta non pulvinar",
        type: ["Test dataset type 2"],
      },
    },
    {
      document_type: "Dataset",
      id: "TEST0000000011010",
      content: {
        accession: null,
        ega_accession: "EGATEST1268314",
        title: "Null GHGA accession test dataset for details 6",
        description:
          "Test dataset for Metadata Repository get dataset details call. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vel risus commodo viverra maecenas accumsan lacus vel. Sit amet risus nullam eget felis eget nunc lobortis mattis. Iaculis at erat pellentesque adipiscing commodo. Volutpat consequat mauris nunc congue. At lectus urna duis convallis convallis tellus id interdum velit. Gravida cum sociis natoque penatibus et. Mauris in aliquam sem fringilla ut morbi. Ultrices gravida dictum fusce ut. At consectetur lorem donec massa sapien faucibus et molestie.",
        type: ["Test dataset type 1"],
      },
    },
    {
      document_type: "Dataset",
      id: "TEST0000000011010",
      content: {
        accession: "GHGA:TEST3548778042110",
        ega_accession: "EGATEST317040805",
        title: "Test dataset for details 7",
        description:
          "Test dataset for Metadata Repository get dataset details call. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vel risus commodo viverra maecenas accumsan lacus vel. Sit amet risus nullam eget felis eget nunc lobortis mattis. Iaculis at erat pellentesque adipiscing commodo. Volutpat consequat mauris nunc congue. At lectus urna duis convallis convallis tellus id interdum velit. Gravida cum sociis natoque penatibus et. Mauris in aliquam sem fringilla ut morbi. Ultrices gravida dictum fusce ut. At consectetur lorem donec massa sapien faucibus et molestie.",
        type: ["Test dataset type 2"],
      },
    },
    {
      document_type: "Dataset",
      id: "TEST0000000011010",
      content: {
        accession: "GHGA:TEST7388734323",
        ega_accession: "EGATEST078873245",
        title: "Test dataset for details 8",
        description:
          "Test dataset for Metadata Repository get dataset details call. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vel risus commodo viverra maecenas accumsan lacus vel. Sit amet risus nullam eget felis eget nunc lobortis mattis. Iaculis at erat pellentesque adipiscing commodo. Volutpat consequat mauris nunc congue. At lectus urna duis convallis convallis tellus id interdum velit. Gravida cum sociis natoque penatibus et. Mauris in aliquam sem fringilla ut morbi. Ultrices gravida dictum fusce ut. At consectetur lorem donec massa sapien faucibus et molestie.",
        type: ["Test dataset type 1"],
      },
    },
    {
      document_type: "Dataset",
      id: "TEST0000000011010",
      content: {
        accession: "GHGA:TEST783420187",
        ega_accession: "EGATEST413120158",
        title: "Test dataset for details 9",
        description:
          "Test dataset for Metadata Repository get dataset details call. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vel risus commodo viverra maecenas accumsan lacus vel. Sit amet risus nullam eget felis eget nunc lobortis mattis. Iaculis at erat pellentesque adipiscing commodo. Volutpat consequat mauris nunc congue. At lectus urna duis convallis convallis tellus id interdum velit. Gravida cum sociis natoque penatibus et. Mauris in aliquam sem fringilla ut morbi. Ultrices gravida dictum fusce ut. At consectetur lorem donec massa sapien faucibus et molestie.",
        type: ["Test dataset type 1"],
      },
    },
    {
      document_type: "Dataset",
      id: "TEST0000000011010",
      content: {
        accession: "GHGA:TEST8045045087",
        ega_accession: "EGATEST786534087",
        title: "Test dataset for details 10",
        description:
          "Test dataset for Metadata Repository get dataset details call. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vel risus commodo viverra maecenas accumsan lacus vel. Sit amet risus nullam eget felis eget nunc lobortis mattis. Iaculis at erat pellentesque adipiscing commodo. Volutpat consequat mauris nunc congue. At lectus urna duis convallis convallis tellus id interdum velit. Gravida cum sociis natoque penatibus et. Mauris in aliquam sem fringilla ut morbi. Ultrices gravida dictum fusce ut. At consectetur lorem donec massa sapien faucibus et molestie.",
        type: ["Test dataset type 2"],
      },
    },
    {
      document_type: "Dataset",
      id: "TEST0000000011010",
      content: {
        accession: "GHGA:TEST8045045087",
        ega_accession: "EGATEST786534087",
        title: "Test dataset for details 10",
        description:
          "Test dataset for Metadata Repository get dataset details call. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vel risus commodo viverra maecenas accumsan lacus vel. Sit amet risus nullam eget felis eget nunc lobortis mattis. Iaculis at erat pellentesque adipiscing commodo. Volutpat consequat mauris nunc congue. At lectus urna duis convallis convallis tellus id interdum velit. Gravida cum sociis natoque penatibus et. Mauris in aliquam sem fringilla ut morbi. Ultrices gravida dictum fusce ut. At consectetur lorem donec massa sapien faucibus et molestie.",
        type: ["Test dataset type 2"],
      },
    },
    {
      document_type: "Dataset",
      id: "TEST0000000011010",
      content: {
        accession: "GHGA:TEST8045045087",
        ega_accession: "EGATEST786534087",
        title: "Test dataset for details 10",
        description:
          "Test dataset for Metadata Repository get dataset details call. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vel risus commodo viverra maecenas accumsan lacus vel. Sit amet risus nullam eget felis eget nunc lobortis mattis. Iaculis at erat pellentesque adipiscing commodo. Volutpat consequat mauris nunc congue. At lectus urna duis convallis convallis tellus id interdum velit. Gravida cum sociis natoque penatibus et. Mauris in aliquam sem fringilla ut morbi. Ultrices gravida dictum fusce ut. At consectetur lorem donec massa sapien faucibus et molestie.",
        type: ["Test dataset type 2"],
      },
    },
    {
      document_type: "Dataset",
      id: "TEST0000000011010",
      content: {
        accession: "GHGA:TEST8045045087",
        ega_accession: "EGATEST786534087",
        title: "Test dataset for details 10",
        description:
          "Test dataset for Metadata Repository get dataset details call. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vel risus commodo viverra maecenas accumsan lacus vel. Sit amet risus nullam eget felis eget nunc lobortis mattis. Iaculis at erat pellentesque adipiscing commodo. Volutpat consequat mauris nunc congue. At lectus urna duis convallis convallis tellus id interdum velit. Gravida cum sociis natoque penatibus et. Mauris in aliquam sem fringilla ut morbi. Ultrices gravida dictum fusce ut. At consectetur lorem donec massa sapien faucibus et molestie.",
        type: ["Test dataset type 2"],
      },
    },
    {
      document_type: "Dataset",
      id: "TEST0000000011010",
      content: {
        accession: "GHGA:TEST8045045087",
        ega_accession: "EGATEST786534087",
        title: "Test dataset for details 10",
        description:
          "Test dataset for Metadata Repository get dataset details call. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vel risus commodo viverra maecenas accumsan lacus vel. Sit amet risus nullam eget felis eget nunc lobortis mattis. Iaculis at erat pellentesque adipiscing commodo. Volutpat consequat mauris nunc congue. At lectus urna duis convallis convallis tellus id interdum velit. Gravida cum sociis natoque penatibus et. Mauris in aliquam sem fringilla ut morbi. Ultrices gravida dictum fusce ut. At consectetur lorem donec massa sapien faucibus et molestie.",
        type: ["Test dataset type 2"],
      },
    },
    {
      document_type: "Dataset",
      id: "TEST0000000011010",
      content: {
        accession: "GHGA:TEST8045045087",
        ega_accession: "EGATEST786534087",
        title: "Test dataset for details 10",
        description:
          "Test dataset for Metadata Repository get dataset details call. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vel risus commodo viverra maecenas accumsan lacus vel. Sit amet risus nullam eget felis eget nunc lobortis mattis. Iaculis at erat pellentesque adipiscing commodo. Volutpat consequat mauris nunc congue. At lectus urna duis convallis convallis tellus id interdum velit. Gravida cum sociis natoque penatibus et. Mauris in aliquam sem fringilla ut morbi. Ultrices gravida dictum fusce ut. At consectetur lorem donec massa sapien faucibus et molestie.",
        type: ["Test dataset type 2"],
      },
    },
    {
      document_type: "Dataset",
      id: "TEST0000000011010",
      content: {
        accession: "GHGA:TEST8045045087",
        ega_accession: "EGATEST786534087",
        title: "Test dataset for details 10",
        description:
          "Test dataset for Metadata Repository get dataset details call. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vel risus commodo viverra maecenas accumsan lacus vel. Sit amet risus nullam eget felis eget nunc lobortis mattis. Iaculis at erat pellentesque adipiscing commodo. Volutpat consequat mauris nunc congue. At lectus urna duis convallis convallis tellus id interdum velit. Gravida cum sociis natoque penatibus et. Mauris in aliquam sem fringilla ut morbi. Ultrices gravida dictum fusce ut. At consectetur lorem donec massa sapien faucibus et molestie.",
        type: ["Test dataset type 2"],
      },
    },
    {
      document_type: "Dataset",
      id: "TEST0000000011010",
      content: {
        accession: "GHGA:TEST8045045087",
        ega_accession: "EGATEST786534087",
        title: "Test dataset for details 10",
        description:
          "Test dataset for Metadata Repository get dataset details call. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vel risus commodo viverra maecenas accumsan lacus vel. Sit amet risus nullam eget felis eget nunc lobortis mattis. Iaculis at erat pellentesque adipiscing commodo. Volutpat consequat mauris nunc congue. At lectus urna duis convallis convallis tellus id interdum velit. Gravida cum sociis natoque penatibus et. Mauris in aliquam sem fringilla ut morbi. Ultrices gravida dictum fusce ut. At consectetur lorem donec massa sapien faucibus et molestie.",
        type: ["Test dataset type 2"],
      },
    },
    {
      document_type: "Dataset",
      id: "TEST0000000011010",
      content: {
        accession: "GHGA:TEST8045045087",
        ega_accession: "EGATEST786534087",
        title: "Test dataset for details 10",
        description:
          "Test dataset for Metadata Repository get dataset details call. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vel risus commodo viverra maecenas accumsan lacus vel. Sit amet risus nullam eget felis eget nunc lobortis mattis. Iaculis at erat pellentesque adipiscing commodo. Volutpat consequat mauris nunc congue. At lectus urna duis convallis convallis tellus id interdum velit. Gravida cum sociis natoque penatibus et. Mauris in aliquam sem fringilla ut morbi. Ultrices gravida dictum fusce ut. At consectetur lorem donec massa sapien faucibus et molestie.",
        type: ["Test dataset type 2"],
      },
    },
    {
      document_type: "Dataset",
      id: "TEST0000000011010",
      content: {
        accession: "GHGA:TEST8045045087",
        ega_accession: "EGATEST786534087",
        title: "Test dataset for details 10",
        description:
          "Test dataset for Metadata Repository get dataset details call. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vel risus commodo viverra maecenas accumsan lacus vel. Sit amet risus nullam eget felis eget nunc lobortis mattis. Iaculis at erat pellentesque adipiscing commodo. Volutpat consequat mauris nunc congue. At lectus urna duis convallis convallis tellus id interdum velit. Gravida cum sociis natoque penatibus et. Mauris in aliquam sem fringilla ut morbi. Ultrices gravida dictum fusce ut. At consectetur lorem donec massa sapien faucibus et molestie.",
        type: ["Test dataset type 2"],
      },
    },
    {
      document_type: "Dataset",
      id: "TEST0000000011010",
      content: {
        accession: "GHGA:TEST8045045087",
        ega_accession: "EGATEST786534087",
        title: "Test dataset for details 10",
        description:
          "Test dataset for Metadata Repository get dataset details call. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vel risus commodo viverra maecenas accumsan lacus vel. Sit amet risus nullam eget felis eget nunc lobortis mattis. Iaculis at erat pellentesque adipiscing commodo. Volutpat consequat mauris nunc congue. At lectus urna duis convallis convallis tellus id interdum velit. Gravida cum sociis natoque penatibus et. Mauris in aliquam sem fringilla ut morbi. Ultrices gravida dictum fusce ut. At consectetur lorem donec massa sapien faucibus et molestie.",
        type: ["Test dataset type 2"],
      },
    },
    {
      document_type: "Dataset",
      id: "TEST0000000011010",
      content: {
        accession: "GHGA:TEST8045045087",
        ega_accession: "EGATEST786534087",
        title: "Test dataset for details 10",
        description:
          "Test dataset for Metadata Repository get dataset details call. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vel risus commodo viverra maecenas accumsan lacus vel. Sit amet risus nullam eget felis eget nunc lobortis mattis. Iaculis at erat pellentesque adipiscing commodo. Volutpat consequat mauris nunc congue. At lectus urna duis convallis convallis tellus id interdum velit. Gravida cum sociis natoque penatibus et. Mauris in aliquam sem fringilla ut morbi. Ultrices gravida dictum fusce ut. At consectetur lorem donec massa sapien faucibus et molestie.",
        type: ["Test dataset type 2"],
      },
    },
    {
      document_type: "Dataset",
      id: "TEST0000000011010",
      content: {
        accession: "GHGA:TEST8045045087",
        ega_accession: "EGATEST786534087",
        title: "Test dataset for details 10",
        description:
          "Test dataset for Metadata Repository get dataset details call. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vel risus commodo viverra maecenas accumsan lacus vel. Sit amet risus nullam eget felis eget nunc lobortis mattis. Iaculis at erat pellentesque adipiscing commodo. Volutpat consequat mauris nunc congue. At lectus urna duis convallis convallis tellus id interdum velit. Gravida cum sociis natoque penatibus et. Mauris in aliquam sem fringilla ut morbi. Ultrices gravida dictum fusce ut. At consectetur lorem donec massa sapien faucibus et molestie.",
        type: ["Test dataset type 2"],
      },
    },
    {
      document_type: "Dataset",
      id: "TEST0000000011010",
      content: {
        accession: "GHGA:TEST8045045087",
        ega_accession: "EGATEST786534087",
        title: "Test dataset for details 10",
        description:
          "Test dataset for Metadata Repository get dataset details call. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vel risus commodo viverra maecenas accumsan lacus vel. Sit amet risus nullam eget felis eget nunc lobortis mattis. Iaculis at erat pellentesque adipiscing commodo. Volutpat consequat mauris nunc congue. At lectus urna duis convallis convallis tellus id interdum velit. Gravida cum sociis natoque penatibus et. Mauris in aliquam sem fringilla ut morbi. Ultrices gravida dictum fusce ut. At consectetur lorem donec massa sapien faucibus et molestie.",
        type: ["Test dataset type 2"],
      },
    },
    {
      document_type: "Dataset",
      id: "TEST0000000011010",
      content: {
        accession: "GHGA:TEST8045045087",
        ega_accession: "EGATEST786534087",
        title: "Test dataset for details 10",
        description:
          "Test dataset for Metadata Repository get dataset details call. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vel risus commodo viverra maecenas accumsan lacus vel. Sit amet risus nullam eget felis eget nunc lobortis mattis. Iaculis at erat pellentesque adipiscing commodo. Volutpat consequat mauris nunc congue. At lectus urna duis convallis convallis tellus id interdum velit. Gravida cum sociis natoque penatibus et. Mauris in aliquam sem fringilla ut morbi. Ultrices gravida dictum fusce ut. At consectetur lorem donec massa sapien faucibus et molestie.",
        type: ["Test dataset type 2"],
      },
    },
    {
      document_type: "Dataset",
      id: "TEST0000000011010",
      content: {
        accession: "GHGA:TEST8045045087",
        ega_accession: "EGATEST786534087",
        title: "Test dataset for details 10",
        description:
          "Test dataset for Metadata Repository get dataset details call. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vel risus commodo viverra maecenas accumsan lacus vel. Sit amet risus nullam eget felis eget nunc lobortis mattis. Iaculis at erat pellentesque adipiscing commodo. Volutpat consequat mauris nunc congue. At lectus urna duis convallis convallis tellus id interdum velit. Gravida cum sociis natoque penatibus et. Mauris in aliquam sem fringilla ut morbi. Ultrices gravida dictum fusce ut. At consectetur lorem donec massa sapien faucibus et molestie.",
        type: ["Test dataset type 2"],
      },
    },
  ],
};
