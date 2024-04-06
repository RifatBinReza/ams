const assessmentRepository = require("../repositories/assessment");
const sectionRepository = require("../repositories/section");
const questionRepository = require("../repositories/question");
const optionRepository = require("../repositories/option");

const assessmentService = () => {

  const create = async (data) => {
    const { title, sections } = data;
    try {
      const newAssessment = await assessmentRepository.create({ title });

      for (const section of sections) {
        const newSection = await sectionRepository.create({ ...section, assessmentId: newAssessment.assessmentId });

        for (const question of section.questions) {
          const newQuestion = await questionRepository.create({ ...question, sectionId: newSection.sectionId });

          for (const option of question.options) {
            const newOption = await optionRepository.create({ ...option, questionId: newQuestion.questionId });
          }
        }
      }
      console.log('Create assessment: ', newAssessment);
      return newAssessment;
    } catch (error) {
      console.error('Error creating assessment: ', error);
      throw new Error('Error creating assessment');
    }
  }

  const findAll = async () => {
    const assessments = await assessmentRepository.findAll();

    console.log("Get assessments: ", assessments);

    return assessments;
  };

  const findById = async (assessmentId) => {
    const assessment = await assessmentRepository.findById(assessmentId);

    console.log("Get assessment: ", assessment);

    return assessment;
  };

  const update = async (assessmentId, data) => {
    const assessment = await assessmentRepository.findById(assessmentId);
    if (!assessment) {
      throw new Error("Assessment not found");
    }

    console.log('Update assessment: ', assessment)

    const updatedAssessment = await assessmentRepository.update(assessmentId, data);

    return updatedAssessment;
  }

  const remove = async (assessmentId) => {
    const assessment = await assessmentRepository.findById(assessmentId);
    if (!assessment) {
      throw new Error("assessment not found");
    }

    await assessmentRepository.remove(assessmentId);

    console.log("Removed assessment: ", assessment);

    return assessment;
  };

  return {
    create,
    findAll,
    findById,
    update,
    remove,
  };
};

module.exports = assessmentService();
