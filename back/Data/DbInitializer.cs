using Exam_Prep.Entities;
using Microsoft.CodeAnalysis;
using Microsoft.EntityFrameworkCore;

namespace Exam_Prep.Data
{
    public class DbInitializer
    {
        private readonly ModelBuilder _builder;

        public DbInitializer(ModelBuilder builder)
        {
            _builder = builder;
        }

        public void Seed()
        {
            _builder.Entity<Therapist>(a =>
            {
                a.HasData(new Therapist
                {
                    Id = 1,
                    Name = "Tom",
                    Surname = "Jackson",
                    RoomId = 1
                }) ;
                /*a.HasData(new Author
                {
                    Id = new Guid("6ebc3dbe-2e7b-4132-8c33-e089d47694cd"),
                    Name = "Walter Isaacson",
                    DateOfBirth = new DateTime(1952, 05, 20),
                });*/
            });

            _builder.Entity<Record>(b =>
            {
                b.HasData(new Record
                {
                    Id = 1,
                    RecordTime = new DateTime(2023, 07, 31, 15, 30, 0),
                    PatientName = "Tom",
                    PatientSurname = "Petterson",
                    Description = "PTSR",
                    Frequency = 5,
                    TherapistId = 1
                });
               
            });
        }
    }
}
