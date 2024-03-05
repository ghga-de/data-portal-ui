// Static fake data for mocking the backend

export const user = {
  id: "j.doe@ghga.de",
  ext_id: "aacaffeecaffeecaffeecaffeecaffeecaffeeaad@lifescience-ri.eu",
  name: "John Doe",
  title: "Dr.",
  email: "j.jdoe@home.org",
};

export const IVAs = [{
  id: "TEST00014000001",
  type: "Phone",
  value: "+441234567890004",
  status: "Verified"
},
{
  id: "TEST00014000002",
  type: "Fax",
  value: "+491234567890000",
  status: "Unverified"
}]

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
    iva: "TEST00014000001",
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
  accession: "GHGA:TEST588887987",
  types: ["Test Type"],
  title: "Test dataset for details",
  description:
    "Test dataset for Metadata Repository get dataset details call. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vel risus commodo viverra maecenas accumsan lacus vel. Sit amet risus nullam eget felis eget nunc lobortis mattis. Iaculis at erat pellentesque adipiscing commodo. Volutpat consequat mauris nunc congue. At lectus urna duis convallis convallis tellus id interdum velit. Gravida cum sociis natoque penatibus et. Mauris in aliquam sem fringilla ut morbi. Ultrices gravida dictum fusce ut. At consectetur lorem donec massa sapien faucibus et molestie.",
  studies: [
    {
      accession: "TEST18666800",
      type: "test_genomics",
      title: "Test Study",
      description:
        "Test study description. Pharetra convallis posuere morbi leo urna molestie. Ut faucibus pulvinar elementum integer. Nec nam aliquam sem et tortor. Pretium viverra suspendisse potenti nullam ac. Commodo sed egestas egestas fringilla. Tincidunt dui ut ornare lectus sit. Amet massa vitae tortor condimentum lacinia quis vel eros donec. Feugiat pretium nibh ipsum consequat. Pulvinar etiam non quam lacus suspendisse faucibus interdum. Aliquam sem et tortor consequat id.",
    },
  ],
  publications: [
    {
      doi: "10.1109/5.771073",
      abstract:
        "Test publication abstract. Varius duis at consectetur lorem donec massa sapien faucibus. Amet porttitor eget dolor morbi non arcu. Urna nec tincidunt praesent semper feugiat nibh sed pulvinar proin. Accumsan tortor posuere ac ut consequat semper viverra nam. Vestibulum lorem sed risus ultricies. Sed odio morbi quis commodo odio. Viverra tellus in hac habitasse. Vestibulum mattis ullamcorper velit sed ullamcorper morbi tincidunt. Egestas tellus rutrum tellus pellentesque eu tincidunt tortor. Faucibus purus in massa tempor nec feugiat nisl. Nibh cras pulvinar mattis nunc. In tellus integer feugiat scelerisque varius morbi enim nunc faucibus. Vestibulum mattis ullamcorper velit sed ullamcorper morbi tincidunt. Vitae et leo duis ut diam quam. Egestas fringilla phasellus faucibus scelerisque eleifend donec pretium vulputate. Cras pulvinar mattis nunc sed blandit libero volutpat sed cras. Id diam maecenas ultricies mi eget mauris. Pulvinar etiam non quam lacus suspendisse faucibus interdum posuere lorem. Consequat ac felis donec et.",
      title: "Test publication",
      author: "Test author",
      journal: "Test journal",
      year: "2023",
    },
  ],
  data_access_policy: {
    data_access_committee: {
      alias: "Test DAC",
      email: "test[at]test[dot]de"
    },
    policy_text: `Test policy text. Neque volutpat ac tincidunt vitae semper quis. Mi eget mauris pharetra et ultrices neque ornare. Consectetur purus ut faucibus pulvinar elementum. Tortor at risus viverra adipiscing. Aliquam eleifend mi in nulla. Orci ac auctor augue mauris augue neque gravida. Rutrum tellus pellentesque eu tincidunt tortor aliquam nulla. Turpis massa tincidunt dui ut ornare lectus sit amet. Laoreet suspendisse interdum consectetur libero id faucibus nisl tincidunt. Auctor eu augue ut lectus arcu bibendum. Aenean et tortor at risus.\n
      Diam phasellus vestibulum lorem sed risus ultricies tristique nulla aliquet. Tempor orci eu lobortis elementum nibh. Tincidunt praesent semper feugiat nibh sed pulvinar proin gravida. Sed nisi lacus sed viverra tellus. Orci dapibus ultrices in iaculis nunc sed augue. Gravida dictum fusce ut placerat orci nulla pellentesque dignissim enim. Facilisi cras fermentum odio eu. Est placerat in egestas erat. At ultrices mi tempus imperdiet nulla malesuada. Tincidunt arcu non sodales neque. Mi bibendum neque egestas congue quisque.\n
      Pharetra vel turpis nunc eget lorem dolor sed. Commodo quis imperdiet massa tincidunt nunc pulvinar sapien et. Vel pretium lectus quam id leo. Ornare suspendisse sed nisi lacus sed viverra. Magna etiam tempor orci eu lobortis elementum. Aliquam nulla facilisi cras fermentum. Rutrum tellus pellentesque eu tincidunt tortor aliquam nulla facilisi cras. Nam at lectus urna duis. Nunc scelerisque viverra mauris in aliquam sem fringilla ut morbi. At elementum eu facilisis sed odio morbi quis commodo odio. Amet nisl purus in mollis nunc sed id. Tristique sollicitudin nibh sit amet. Arcu risus quis varius quam quisque id diam. Nisl tincidunt eget nullam non. Bibendum arcu vitae elementum curabitur vitae. Vitae aliquet nec ullamcorper sit amet risus nullam eget felis.\n
      Cum sociis natoque penatibus et magnis. Quam lacus suspendisse faucibus interdum. Lorem dolor sed viverra ipsum. Non pulvinar neque laoreet suspendisse interdum consectetur. Sit amet consectetur adipiscing elit ut aliquam. Mi ipsum faucibus vitae aliquet nec. Eget egestas purus viverra accumsan in nisl nisi scelerisque eu. Vel orci porta non pulvinar neque laoreet suspendisse interdum consectetur. Justo nec ultrices dui sapien eget mi proin sed. Lacus viverra vitae congue eu consequat. Purus viverra accumsan in nisl nisi scelerisque eu ultrices vitae. Pretium aenean pharetra magna ac placerat vestibulum lectus mauris. Consequat interdum varius sit amet mattis vulputate. Venenatis cras sed felis eget velit. Cursus metus aliquam eleifend mi in nulla posuere sollicitudin aliquam. Tristique senectus et netus et malesuada fames ac. Massa enim nec dui nunc mattis enim ut tellus elementum.`,
  },
  sequencing_experiments: [
    {
      alias: "TEST656660",
      description:
        "Test Experiment 1. Sagittis purus sit amet volutpat. Tellus cras adipiscing enim eu turpis egestas pretium. Vitae suscipit tellus mauris a diam maecenas sed enim ut. Vulputate enim nulla aliquet porttitor lacus luctus. Egestas sed sed risus pretium quam vulputate dignissim. Netus et malesuada fames ac turpis egestas maecenas. Nisl condimentum id venenatis a condimentum vitae sapien. Commodo quis imperdiet massa tincidunt nunc pulvinar sapien et. Vitae sapien pellentesque habitant morbi tristique senectus. Leo vel fringilla est ullamcorper eget nulla. Tempus egestas sed sed risus.",
    },
  ],
  samples: [
    {
      alias: "TEST4846964651",
      description:
        "Test Sample 1. Vivamus arcu felis bibendum ut. Eget mi proin sed libero enim. Metus dictum at tempor commodo ullamcorper a lacus. Tincidunt tortor aliquam nulla facilisi cras. Nullam vehicula ipsum a arcu. Malesuada proin libero nunc consequat. Purus faucibus ornare suspendisse sed nisi lacus sed viverra tellus. Elementum eu facilisis sed odio morbi quis. Condimentum id venenatis a condimentum vitae sapien pellentesque habitant. Purus sit amet volutpat consequat mauris nunc. Ultricies mi quis hendrerit dolor magna eget est lorem. Fermentum leo vel orci porta non pulvinar. Integer malesuada nunc vel risus commodo viverra maecenas.",
      condition: {
        name: "Test anatomical entity",
        case_control_status: "Test control status"
      },
      biospecimen: {
        tissue: "Test tissue",
        individual: {
          sex: "FEMALE_SEX_FOR_CLINICAL_USE",
          phenotypic_features: ["Test phenotypic feature 1"]
        }
      }
    },
  ],
  study_files: [
    {
      alias: "Test file 1",
      format: "FASTQ",
      size: 586156,
      checksum: "15117b282328146ac6afebaa8acd80e7",
      checksum_type: "MD5",
    },
  ],
  sample_files: [],
  sequencing_process_files: [],
  analysis_process_output_files: []
};

export const datasetSummary = {
  accession: "GHGA:TEST588887987",
  description:
    "Test dataset for Metadata Repository get dataset details call. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vel risus commodo viverra maecenas accumsan lacus vel. Sit amet risus nullam eget felis eget nunc lobortis mattis. Iaculis at erat pellentesque adipiscing commodo. Volutpat consequat mauris nunc congue. At lectus urna duis convallis convallis tellus id interdum velit. Gravida cum sociis natoque penatibus et. Mauris in aliquam sem fringilla ut morbi. Ultrices gravida dictum fusce ut. At consectetur lorem donec massa sapien faucibus et molestie.",
  type: ["Test Type"],
  title: "Test dataset for details",
  dac_email: "test[at]test[dot]de;",
  samples_summary: {
    count: 3,
    stats: {
      sex: [{ value: "FEMALE_SEX_FOR_CLINICAL_USE", count: 1 }, { value: "MALE_SEX_FOR_CLINICAL_USE", count: 1 }],
      tissues: [{ value: "metastasis", count: 1 }, { value: "tumor", count: 2 }],
      phenotypic_features: [{ value: "Test Phenotype 1", count: 2 }, { value: "Test Phenotype 2", count: 1 }],
    },
  },
  studies_summary: {
    count: 1,
    stats: {
      accession: ["TEST18666800"],
      title: ["Test Study"],
    },
  },
  sequencing_experiments_summary: {
    count: 14,
    stats: {
      sequencing_protocols: [{
        value: "Ilumina test", count: 10
      },
      { value: "HiSeq test", count: 4 }],
    },
  },
  files_summary: {
    count: 27,
    stats: {
      format: [{ value: "fastq", count: 22 }, { value: "bam", count: 5 }],
      size: 434543980,
    },
  },
};

export const metadataSummary = {
  resource_stats: {
    SequencingProcessFile: {
      count: 532,
      stats: {
        format: [{ value: "fastq", count: 124 }, { value: "bam", count: 408 }]
      },
    },
    Individual: {
      count: 5432,
      stats: {
        sex: [{ value: "FEMALE_SEX_FOR_CLINICAL_USE", count: 1935 }, { value: "MALE_SEX_FOR_CLINICAL_USE", count: 2358 }],
      },
    },
    SequencingProtocol: {
      count: 1400,
      stats: {
        type: [{
          value: "Ilumina test", count: 700
        },
        {
          value: "HiSeq test", count: 700,
        }],
      },
    },
    Dataset: {
      count: 252,
      stats: {},
    },
  }
};

export const searchResults = {
  facets: [
    {
      key: "studies.type",
      name: "Study Type",
      options: [
        { value: "Option 1", count: 62 },
        { value: "Option 2", count: 37 },
      ],
    },
    {
      key: "type",
      name: "Dataset Type",
      options: [
        { value: "Test dataset type 1", count: 12 },
        { value: "Test dataset type 2", count: 87 },
      ],
    },
  ],
  count: 25,
  hits: [
    {
      content: {
        accession: "GHGA:TEST588887987",
        title: "Test dataset for details",
        description:
          "Test dataset for Metadata Repository get dataset details call. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vel risus commodo viverra maecenas accumsan lacus vel. Sit amet risus nullam eget felis eget nunc lobortis mattis. Iaculis at erat pellentesque adipiscing commodo. Volutpat consequat mauris nunc congue. At lectus urna duis convallis convallis tellus id interdum velit. Gravida cum sociis natoque penatibus et. Mauris in aliquam sem fringilla ut morbi. Ultrices gravida dictum fusce ut. At consectetur lorem donec massa sapien faucibus et molestie.",
        types: ["Test dataset type 1"],
      }
    },
  ],
};
