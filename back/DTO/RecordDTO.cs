namespace Exam_Prep.DTO
{
    public class RecordDTO
    {
        public int Id { get; set; }

        public DateTime RecordTime { get; set; }

        public string PatientName { get; set; }

        public string PatientSurname { get; set; }
 
        public string Description { get; set; }

        public int Frequency { get; set; }

        public int TherapistId { get; set; }
    }
}
