const assessmentService = require("../services/assessment");
const response = require("../helpers/response");

const AssessmentController = () => {

  const create = async (req, res) => {
    const data = req.body;
    try {
      const assessment = await assessmentService.create(data);

      return response.jsonSuccess(
        res,
        assessment,
        "Successfully created schedule.",
        200
      );
    } catch (error) {
      return response.jsonError(res, error, error.message, 400);
    }
  };

  const getAllAssessments = async (req, res) => {
    try {
      let assessments = await assessmentService.findAll();

      return response.jsonSuccess(
        res,
        assessments,
        "Successfully fetched all schedules.",
        200
      );
    } catch (error) {
      return response.jsonError(res, error, error.message, 400);
    }
  };

  const getById = async (req, res) => {
    const assessmentId = req.params.id;
    try {
      let assessment = await assessmentService.findById(assessmentId);

      return response.jsonSuccess(
        res,
        assessment,
        "Successfully fetched all schedules.",
        200
      );
    } catch (error) {
      return response.jsonError(res, error, error.message, 400);
    }
  };

  const update = async (req, res) => {
    const assessmentId = req.params.id;
    const data = req.body;
    try {
      const assessment = await assessmentService.update(assessmentId, data);

      return response.jsonSuccess(
        res,
        assessment,
        "Successfully updated schedule.",
        200
      );
    } catch (error) {
      return response.jsonError(res, error, error.message, 400);
    }
  };

  const remove = async (req, res) => {
    const assessmentId = req.params.id;
    try {
      const assessment = await assessmentService.remove(assessmentId);

      return response.jsonSuccess(
        res,
        assessment,
        "Successfully removed schedule.",
        200
      );
    } catch (error) {
      return response.jsonError(res, error, error.message, 400);
    }
  };


  const listView = async (req, res) => {
    res.render("assessments");
  };

  const testView = async (req, res) => {
    res.render("assessmentTest");
  };

  return {
    create,
    getById,
    getAllAssessments,
    update,
    remove,
    listView,
    testView,
  };
};

module.exports = AssessmentController();
