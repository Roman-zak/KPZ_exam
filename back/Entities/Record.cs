using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Exam_Prep.Entities
{
    public class Record
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required]
        public DateTime RecordTime { get; set; }
        [Required]
        public string PatientName { get; set; }
        [Required]
        public string PatientSurname { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public int Frequency { get; set; }
        [Required]
        public int TherapistId { get; set; }

    }
}