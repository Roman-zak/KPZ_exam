using Exam_Prep.Data;
using Exam_Prep.Entities;
using Microsoft.EntityFrameworkCore;
//using System.Data.Entity;

namespace Exam_Prep.DB
{
    public class PsychotherapyClinicDBContext : DbContext
    {
        public PsychotherapyClinicDBContext(DbContextOptions<PsychotherapyClinicDBContext> options) : base(options)
        {

        }
        protected override void OnModelCreating(ModelBuilder builder)
        {

            // Define relationship between books and authors
/*            builder.Entity<Record>()
                .HasOne(x => x.PatientId)
                .WithMany(x => x.);*/

            // Seed database with authors and books for demo
              new DbInitializer(builder).Seed();
        }
        public DbSet<Therapist> Therapists { get; set; }
        public DbSet<Record> Records { get; set; }
    }
}
